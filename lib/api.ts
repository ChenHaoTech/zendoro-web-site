import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { getFilesRecursively } from './modules/find-files-recusively.mjs'
import { getMDExcerpt } from './markdownToHtml'

const mdDir = path.join(process.cwd(), process.env.COMMON_MD_DIR)

/**
 * 根据给定的 slug 和字段列表获取文章数据
 * @param {string} slug - 文章的 slug（文件名）
 * @param {string[]} fields - 需要获取的字段列表
 * @returns {Items} 包含指定字段的文章数据对象
 */
export function getPostBySlug(slug: string, fields: string[] = []) {
  // 去掉 slug 中的 .md 后缀
  const realSlug = slug.replace(/\.md$/, '')
  // 获取文章的完整路径
  const fullPath = path.join(mdDir, 
`${realSlug}.md`)
  // 解析文件内容为对象
  const data = parseFileToObj(fullPath);

  type Items = {
    [key: string]: string
  }

  const items: Items = {}

  // 确保只暴露所需的最小数据
  fields.forEach((field) => {
    // 如果字段是 'slug'，则直接赋值 realSlug
    if (field === 'slug') {
      items[field] = realSlug
    }

    // 如果 data 中存在该字段，则赋值给 items
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })
  return items
}


/**
 * 解析给定路径的 Markdown 文件为对象
 * @param {string} pathToObj - 文件路径
 * @returns {object} 包含文件数据和内容的对象
 */
function parseFileToObj(pathToObj: string) {
  // 读取文件内容
  const fileContents = fs.readFileSync(pathToObj, 'utf8')
  // 使用 gray-matter 解析文件内容
  const { data, content } = matter(fileContents)

  // 将文件内容添加到 data 对象中
  data['content'] = content

  // 如果没有摘要，则生成摘要
  if (typeof data['excerpt'] === 'undefined') {
    data['excerpt'] = getMDExcerpt(content, 500);
  }
  // 如果没有标题，则使用文件名作为标题
  if (typeof data['title'] === 'undefined') {
    data['title'] = decodeURI(path.basename(pathToObj, '.md'))
  }
  // 将日期对象转换为 ISO 字符串
  if (typeof data['date'] === 'object') {
    data['date'] = data['date']?.toISOString()
  } else if (typeof data['date'] !== 'undefined') {
    // 将日期转换为字符串
    data['date'] = data['date'].toString()
  }
  // 返回解析后的数据对象
  return data
}


export function getAllPosts(fields: string[] = []) {
  let files = getFilesRecursively(mdDir, /\.md/);
  let posts = files
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}

export function getLinksMapping() {
  const linksMapping = new Map<string, string[]>();
  const postsMapping = new Map((getAllPosts(['slug', 'content'])).map(i => [i.slug, i.content]));
  const allSlugs = new Set(postsMapping.keys());
  postsMapping.forEach((content, slug) => {
    const mdLink = /\[[^\[\]]+\]\(([^\(\)]+)\)/g
    const matches = Array.from(content.matchAll(mdLink))
    const linkSlugs = []
    for (var m of matches) {
      const linkSlug = getSlugFromHref(slug, m[1])
      if (allSlugs.has(linkSlug)) {
        linkSlugs.push(linkSlug);
      }
    }
    linksMapping[slug] = linkSlugs
  });
  return linksMapping;
}

export function getSlugFromHref (currSlug: string, href: string) {
  return decodeURI(path.join(...currSlug.split(path.sep).slice(0, -1), href)).replace(/\.md$/, '')
}

/**
 * 更新Markdown中的链接
 * @param markdown - 需要处理的Markdown字符串
 * @param currSlug - 当前文件的路径
 * @returns 更新后的Markdown字符串
 */
export function updateMarkdownLinks(markdown: string, currSlug: string) {
  // 移除链接中的 `.md` 后缀
  markdown = markdown.replaceAll(/(\[[^\[\]]+\]\([^\(\)]+)(\.md)(\))/g, "$1$3");

  // 更新图片链接
  markdown = markdown.replaceAll(/(\[[^\[\]]*\]\()([^\(\)]+)(\))/g, (m, m1, m2: string, m3) => {
    // 获取当前文件所在目录
    const slugDir = path.join(...currSlug.split(path.sep).slice(0, -1))
    let relLink = m2;
    // 如果链接不是以当前目录开头，则将其转换为相对路径
    if (!m2.startsWith(slugDir)) {
      relLink = path.join(slugDir, m2)
    }
    // 获取相对于 `./public` 目录的资源目录
    const relAssetDir = path.relative('./public', process.env.MD_ASSET_DIR)
    // 获取相对路径和绝对路径
    const fileSlugRel = decodeURI(path.join(mdDir, relLink))
    const fileSlugAbs = decodeURI(path.join(mdDir, m2))
    // 检查相对路径文件是否存在
    if (fs.existsSync(fileSlugRel)) {
      const imgPath = path.join(relAssetDir, relLink);
      return `${m1}/${imgPath}${m3}`
    // 检查绝对路径文件是否存在
    } else if (fs.existsSync(fileSlugAbs)) {
      const imgPath = path.join(relAssetDir, m2);
      return `${m1}/${imgPath}${m3}`
    }
    // 如果文件不存在，返回原始字符串
    return m;
  });
  return markdown
}
