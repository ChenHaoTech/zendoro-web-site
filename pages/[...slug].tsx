import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getAllPosts, getLinksMapping, getPostBySlug } from "../lib/api";
import Head from "next/head";
import { markdownToHtml } from "../lib/markdownToHtml";
import type PostType from "../interfaces/post";
import path from "path";
import PostSingle from "../components/post/post-single";
import Layout from "../components/misc/layout";
import Comments from "../components/blog/comments";
import { NextSeo } from "next-seo";
import PostWrapper from "../components/post/post-wrapper";

type Items = {
  title: string;
  excerpt: string;
};

type Props = {
  post: PostType;
  slug: string;
  backlinks: { [k: string]: Items };
};

export default function Post({ post, backlinks }: Props) {
  const router = useRouter();
  const description = post.excerpt.slice(0, 155);
  const absUrl = path.join("https://fleetingnotes.app", router.asPath);
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      {router.isFallback ? <h1>Loading…</h1> : (
        <Layout>
          <NextSeo
            title={post.title}
            description={description}
            canonical={absUrl}
            openGraph={{
              title: post.title,
              description,
              type: "article",
              url: absUrl,
              images: [{
                url: (post.ogImage?.url)
                  ? post.ogImage.url
                  : "https://fleetingnotes.app/favicon/512.png",
                width: (post.ogImage?.url) ? null : 512,
                height: (post.ogImage?.url) ? null : 512,
                type: null,
              }],
            }}
          />
          <PostWrapper className="max-w-2xl mx-auto px-4">
            <PostSingle
              title={post.title}
              content={post.content}
              date={post.date}
              author={post.author}
              backlinks={backlinks}
            />
            <Comments />
          </PostWrapper>
        </Layout>
      )}
    </>
  );
}

type Params = {
  params: {
    slug: string[];
    backlinks: string[];
  };
};

export async function getStaticProps({ params }: Params) {
  // 将 params.slug 数组拼接成一个路径字符串
  const slug = path.join(...params.slug);
  
  // 根据 slug 获取文章的详细信息
  const post = await getPostBySlug(slug, [
    "title",
    "excerpt",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  
  // 将文章内容从 Markdown 转换为 HTML
  const content = await markdownToHtml(post.content || "", slug);
  
  // 获取所有链接的映射关系
  const linkMapping = await getLinksMapping();
  
  // 找到所有包含当前文章 slug 的反向链接，并排除当前文章本身
  const backlinks = Object.keys(linkMapping).filter((k) =>
    linkMapping[k].includes(post.slug) && k !== post.slug
  );
  
  // 获取每个反向链接文章的标题和摘要
  const backlinkNodes = Object.fromEntries(
    await Promise.all(backlinks.map(async (slug) => {
      const post = await getPostBySlug(slug, ["title", "excerpt"]);
      return [slug, post];
    })),
  );

  // 返回文章的详细信息和反向链接信息作为属性
  return {
    props: {
      post: {
        ...post,
        content,
      },
      backlinks: backlinkNodes,
    },
  };
}


/**
 * 获取静态路径
 * 该函数用于获取所有文章的静态路径，并过滤掉以 "docs/" 开头的文章。
 * 返回的路径将用于静态生成页面。
 */
export async function getStaticPaths() {
  // 获取所有文章的 slug
  let posts = await getAllPosts(["slug"]);
  
  // 过滤掉以 "docs/" 开头的文章
  posts = posts.filter(p => !p.slug.startsWith('docs/'));

  return {
    // 将每篇文章的 slug 分割成路径数组
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug.split(path.sep),
        },
      };
    }),
    // fallback 设置为 false，表示其他未定义的路径将返回 404 页面
    fallback: false,
  };
}
