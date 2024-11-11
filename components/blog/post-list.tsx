import React from 'react';

import PostPreview from '../post/post-preview'
import type Post from '../../interfaces/post'
import PopularPosts from './popular-posts';
import PreviewLink from '../misc/preview-link';

type Props = {
  posts: Post[]
}

/**
 * PostList 组件用于展示一系列的文章预览和一个侧边栏的热门文章。
 * @param {Props} props - 包含文章列表的属性。
 */
function PostList({ posts }: Props) {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* 页面头部 */}
          <div className="max-w-3xl pb-12 md:pb-20 text-center md:text-left">
            <h1 className="h1 mb-4">Explore my notes</h1>
            <p className="text-xl text-gray-600">
              Posts are connected through <PreviewLink href="/notes/bi-directional-links">bi-directional links</PreviewLink>. Click any post and check it out!
            </p>
          </div>

          {/* 主要内容 */}
          <div className="md:flex md:justify-between">

            {/* 文章容器 */}
            <div className="md:grow -mt-4">
              {posts.map((post) => (
                <PostPreview
                  key={post.slug}
                  title={post.title}
                  date={post.date}
                  excerpt={post.excerpt}
                  author={post.author}
                  slug={post.slug}
                />
              ))}
            </div>

            {/* 侧边栏 */}
            <aside className="relative mt-12 md:mt-0 md:w-64 md:ml-12 lg:ml-20 md:shrink-0">
              <PopularPosts />
            </aside>

          </div>

        </div>
      </div>
    </section>
  );
}



export default PostList;