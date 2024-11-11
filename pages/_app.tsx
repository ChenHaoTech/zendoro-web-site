import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config';
import { AppProps } from 'next/app'
import '../styles/index.css'
import posthog from 'posthog-js';

/**
 * 初始化 PostHog 并设置页面视图跟踪
 */
function setupPostHog() {
  // 获取 Next.js 的路由对象
  const router = useRouter();

  useEffect(() => {
    /**
     * PostHog 是一个开源的产品分析平台，旨在帮助团队更好地理解用户行为。它提供了用户行为跟踪、事件捕获、数据分析等功能，帮助产品团队做出数据驱动的决策。PostHog 可以与各种前端和后端技术栈集成，支持自托管和云托管两种部署方式。通过 PostHog，团队可以实时监控用户在应用中的操作，分析用户路径，创建漏斗分析，进行 A/B 测试等。
     */
    // 初始化 PostHog ，使用环境变量中的 API 密钥和主机地址
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY, { api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST });

    // 定义路由变化时的处理函数，捕获页面视图事件
    const handleRouteChange = () => posthog.capture('$pageview');

    // 监听路由变化完成事件，调用处理函数
    router.events.on('routeChangeComplete', handleRouteChange);

    // 清理函数，组件卸载时移除事件监听
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);
}

/**
 * 自定义的 MyApp 组件，初始化 PostHog 并渲染页面组件
 * @param Component - 当前页面组件
 * @param pageProps - 当前页面的属性
 */
export default function MyApp({ Component, pageProps }: AppProps) {
  // 调用 setupPostHog 函数初始化 PostHog
  setupPostHog();

  return (
    <>
      {/* 设置默认的 SEO 配置 */}
      <DefaultSeo {...SEO} />
      {/* 渲染当前页面组件 */}
      <Component {...pageProps} />
    </>
  )
}
