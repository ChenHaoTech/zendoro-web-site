import { useState } from "react";
import { SidebarData } from "../../pages/docs/[...slug]";

type Props = {
  sidebarData: SidebarData;
  slug: string;
};
export default function DocumentationSidebar({
  sidebarData,
  slug,
}: Props) {
  // 初始化链接打开状态
  let initLinkOpenState = null;
  Object.keys(sidebarData).forEach((k, i) => {
    if (slug.startsWith(`docs/${k}`)) {
      initLinkOpenState = i;
    }
  });

  // 定义侧边栏导航和链接打开状态的状态变量
  const [sidebarNavOpen, setSidebarNavOpen] = useState<boolean>(false);
  const [sidebarLinkOpen, setSidebarLinkOpen] = useState<number | null>(initLinkOpenState);

  return (
    <aside className="relative my-12 md:my-0 md:w-64 md:mr-12 lg:mr-20 md:shrink-0">
      <div className="sticky top-28">
        {/* 移动端显示的导航按钮 */}
        <button
          className="flex items-center justify-between text-lg font-medium text-gray-900 w-full my-4 md:hidden"
          onClick={(e) => {
            e.preventDefault();
            setSidebarNavOpen(!sidebarNavOpen);
          }}
        >
          <span>Docs navigation</span>
          <svg
            className="w-3 h-3 fill-current text-blue-600 shrink-0 ml-2"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              className={`transform origin-center transition duration-200 ease-out ${
                sidebarNavOpen && "!rotate-180"
              }`}
            />
            <rect
              y="7"
              width="16"
              height="2"
              rx="1"
              className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                sidebarNavOpen && "!rotate-180"
              }`}
            />
          </svg>
        </button>

        {/* 文档导航 */}
        <nav className={`md:block ${!sidebarNavOpen && "hidden"}`}>
          <ul className="font-medium -my-2">
            {/* 一级导航 */}
            {Object.keys(sidebarData).map((k, i) => {
              const title = sidebarData[k].find(e => e.file === `index`)?.title || k;
              return (
                <li key={i} className="py-2">
                  <a
                    className="flex items-center hover:underline"
                    href="#0"
                    onClick={(e) => {
                      e.preventDefault();
                      if (sidebarLinkOpen == i) {
                        setSidebarLinkOpen(null);
                      } else {
                        setSidebarLinkOpen(i);
                      }
                    }}
                    aria-expanded={sidebarLinkOpen == i}
                  >
                    {/* 一级导航标题 */}
                    <div className="flex items-center grow">
                      <span>{title}</span>
                    </div>
                    <svg
                      className="w-3 h-3 fill-current text-gray-400 cursor-pointer ml-1 shrink-0"
                      viewBox="0 0 12 12"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.28 4.305L5.989 8.598 1.695 4.305A1 1 0 00.28 5.72l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z" />
                    </svg>
                  </a>
                  {/* 二级导航 */}
                  <ul
                    className={`font-normal -mb-1 mt-1 ml-2 pl-5 border-l border-gray-300 ${
                      !(sidebarLinkOpen == i) && "hidden"
                    }`}
                  >
                    {sidebarData[k].map((obj, i) => {
                      if (obj.file === 'index') return null;
                      return (
                      <li key={i} className="py-1">
                        <a
                          className="text-gray-600 hover:underline"
                          href={`/docs/${k}/${obj.file}`}
                        >
                          {obj.title || obj.file}
                        </a>
                      </li>
                    )})}
                  </ul>
                </li>
            )})}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
