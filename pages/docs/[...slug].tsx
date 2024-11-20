import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import path from "path";
import { NextSeo } from "next-seo";

import { getAllPosts, getLinksMapping, getPostBySlug } from "../../lib/api";
import { markdownToHtml } from "../../lib/markdownToHtml";
import type PostType from "../../interfaces/post";
import PostSingle from "../../components/post/post-single";
import Layout from "../../components/misc/layout";
import Comments from "../../components/blog/comments";
import DocumentationSidebar from "../../components/docs/sidebar";
import PostWrapper from "../../components/post/post-wrapper";

type Items = {
  title: string;
  excerpt: string;
};

type Props = {
  post: PostType;
  slug: string;
  backlinks: { [k: string]: Items };
  sidebarData: SidebarData;
};
/**
 * DocumentationPost 组件用于渲染文档页面
 * @param post 文章内容
 * @param backlinks 反向链接
 * @param sidebarData 侧边栏数据
 */
export default function DocumentationPost(
  { post, backlinks, sidebarData }: Props,
) {
  const router = useRouter();
  // 截取文章摘要的前 155 个字符作为描述
  const description = post.excerpt.slice(0, 155);
  // 构建文章的绝对 URL
  const absUrl = path.join(process.env.NEXT_PUBLIC_APP_WEB_LINK, router.asPath);
  // 如果路由不是回退状态且文章没有 slug，返回 404 错误页面
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
                // 如果文章有 ogImage，使用其 URL，否则使用默认图片
                url: (post.ogImage?.url)
                  ? post.ogImage.url
                  : `${process.env.NEXT_PUBLIC_APP_WEB_LINK}/favicon/android-chrome-512x512.png`,
                width: (post.ogImage?.url) ? null : 512,
                height: (post.ogImage?.url) ? null : 512,
                type: null,
              }],
            }}
          />
          <PostWrapper className="max-w-5xl mx-auto px-4">
            <div className="md:flex md:justify-between">
              {/* 渲染文档侧边栏 */}
              <DocumentationSidebar
                sidebarData={sidebarData}
                slug={post.slug}
              />
              {/* 渲染文章内容 */}
              <PostSingle
                title={post.title}
                content={post.content}
                date={post.date}
                author={post.author}
                backlinks={backlinks}
              />
            </div>
            <div className="max-w-3xl mx-auto">
              {/* 渲染评论组件 */}
              <Comments />
            </div>
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
    sidebarData: SidebarData;
  };
};

/**
 * 获取静态属性，用于生成静态页面
 * @param params 包含 slug 的参数对象
 * @returns 包含文章内容、反向链接和侧边栏数据的属性对象
 */
export async function getStaticProps({ params }: Params) {
  // 将 slug 数组拼接成路径字符串
  const slug = path.join(...params.slug);
  // 构建文档的完整 slug 路径
  const docSlug = path.join("docs", slug);
  // 根据 slug 获取文章数据
  const post = getPostBySlug(docSlug, [
    "title",
    "excerpt",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  // 将文章内容从 markdown 转换为 HTML
  const content = await markdownToHtml(post.content || "", docSlug);
  // 获取所有链接映射
  const linkMapping = getLinksMapping();
  // 过滤出指向当前文章的反向链接
  const backlinks = Object.keys(linkMapping).filter((k) =>
    linkMapping[k].includes(post.slug) && k !== post.slug
  );
  // 获取反向链接的文章数据
  const backlinkNodes = Object.fromEntries(
    await Promise.all(backlinks.map(async (slug) => {
      const post = await getPostBySlug(slug, ["title", "excerpt"]);
      return [slug, post];
    })),
  );

  // 返回包含文章内容、反向链接和侧边栏数据的属性对象
  return {
    props: {
      post: {
        ...post,
        content,
      },
      backlinks: backlinkNodes,
      sidebarData: getSidebarData(),
    },
  };
}


export async function getStaticPaths() {
  const posts = getAllPostsInDocs();
  return {
    paths: posts.map(
      (post: { slug: string }): { params: { slug: string[] } } => {
        return {
          params: {
            slug: post.slug.split(path.sep),
          },
        };
      },
    ),
    fallback: false,
  };
}

/**
 * 获取所有在 "docs/" 目录下的文章
 * @returns 过滤并处理后的文章列表
 */
function getAllPostsInDocs() {
  // 获取所有文章并过滤出 slug 以 "docs/" 开头的文章
  const posts = getAllPosts(["slug", "title"]).filter((p: { slug: string }) =>
    p.slug.startsWith("docs/")
  );
  // 去掉 slug 中的 "docs/" 前缀
  posts.forEach((p: { slug: string }) => {
    p.slug = p.slug.replace("docs/", "");
  });
  return posts;
}

export type SidebarData = { [key: string]: { title: string, file: string }[] };

/**
 * 获取侧边栏数据
 * @returns 侧边栏数据对象，包含文件夹和文件信息
 */
function getSidebarData() {
  // 获取所有在 "docs/" 目录下的文章
  const posts = getAllPostsInDocs();
  const sidebarData: SidebarData = {};
  // 遍历每篇文章，构建侧边栏数据
  posts.forEach((p: { slug: string, title: string }) => {
    // 将 slug 按路径分隔符拆分
    const parts = p.slug.split(path.sep);
    // 如果分隔后的部分长度为 2，表示有文件夹和文件
    if (parts.length == 2) {
      const [folder, file] = parts;
      const obj = {
        title: p?.title,
        file: file,
      }
      // 如果文件夹已存在于 sidebarData 中，添加文件信息
      if (sidebarData[folder]) {
        sidebarData[folder].push(obj);
      } else {
        // 如果文件夹不存在，创建新的文件夹并添加文件信息
        sidebarData[folder] = [obj];
      }
    }
  });
  return sidebarData;
}
