import React from "react";
import Author from "../../interfaces/author";
import Backlinks from "../misc/backlinks";
import PostBody from "./post-body";
import PostMeta from "./post-meta";

type Props = {
  title: string;
  content: string;
  date?: string;
  author?: Author;
  backlinks: {
    [k: string]: {
      title: string;
      excerpt: string;
    };
  };
};

/**
 * PostSingle 组件用于展示单篇文章的详细内容，包括标题、作者信息、日期、内容和反向链接。
 * @param {string} title - 文章标题
 * @param {string} content - 文章内容
 * @param {string} [date] - 文章发布日期（可选）
 * @param {Author} [author] - 文章作者信息（可选）
 * @param {Object} backlinks - 反向链接信息
 * @returns {JSX.Element} - 返回一个包含文章详细内容的 JSX 元素
 */
function PostSingle({
  title,
  date,
  author,
  content,
  backlinks,
}: Props) {
  return (
    <div className="mx-auto mb-10 max-w-3xl">
      <article>
        {/* 文章头部 */}
        <header className="mb-10 pt-0">
          {/* 文章标题 */}
          <h1 className="h1 text-center mb-4 text-6xl">{title}</h1>
        </header>

        {/* 文章内容 */}
        <div>
          {/* 文章元信息（作者和日期） */}
          {(author || date) && (
            <>
              <PostMeta author={author} date={date} />
              <hr className="w-16 h-px pt-px bg-gray-200 border-0 my-6" />
            </>
          )}

          {/* 文章主体内容 */}
          <PostBody content={content} />
        </div>

        {/* 文章尾部 */}
      </article>

      {/* 反向链接 */}
      {(Object.keys(backlinks).length > 0) && (
        <div>
          <hr className="my-8 border border-dashed lg:block" />
          <h3 className="h3 mb-4">
            Backlinks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Backlinks backlinks={backlinks} />
          </div>
        </div>
      )}
      {/* 反向链接结束 */}
    </div>
  );
}

export default PostSingle;
