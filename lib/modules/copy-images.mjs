// https://www.codeconcisely.com/posts/nextjs-storing-images-next-to-markdown/
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import fsExtra from 'fs-extra';
import { getFilesRecursively } from './find-files-recusively.mjs';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const allowedImageFileExtensions = /^((?!\.md).)*$/; // not markdown
const targetDir = process.env.MD_ASSET_DIR
const postsDir = process.env.COMMON_MD_DIR;

/**
 * 该函数用于创建用于复制的帖子图片文件夹
 * 它会递归地获取所有图片文件，并将它们从源目录复制到目标目录
 */
function createPostImageFoldersForCopy() {
  // 获取所有图片文件的相对路径
  const imgSlugs = getFilesRecursively(postsDir, allowedImageFileExtensions);
  
  // 遍历每一个图片文件的相对路径
  for (const relSlug of imgSlugs) {
    // 获取当前图片文件的完整路径
    const currSlug = path.join(postsDir, relSlug);
    // 获取目标目录中对应的图片文件路径
    const targetSlug = path.join(targetDir, relSlug);
    // 获取目标图片文件所在的目录路径
    const slugDir = path.dirname(targetSlug);
    
    // 如果目标目录不存在，则创建该目录
    if (!fs.existsSync(slugDir)) {
      fs.mkdirSync(slugDir, { recursive: true });
    }
    
    // 将当前图片文件复制到目标目录
    fs.copyFileSync(currSlug, targetSlug);
  }
}



await fsExtra.emptyDir(targetDir);
createPostImageFoldersForCopy();