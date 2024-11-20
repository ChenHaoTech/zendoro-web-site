import { search } from 'fast-fuzzy';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react';
import { subscribeCustomerIo } from '../../components/utils/newsletter'

export default function NewsletterSubscribe() {
  const router = useRouter();
  useEffect(() => {
    // 从当前路由路径中提取查询参数
    const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);
    // 获取查询参数中的 email 值
    const email = searchParams.get('email');
    // 如果 email 存在，则调用 subscribeCustomerIo 函数进行订阅操作
    if (email) {
      subscribeCustomerIo(email);
    }
  }, []);


  return (
    <div className="h-screen">
      <div className="bg-white p-6  md:mx-auto">
        <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
          <path fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
          </path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">Subscribed!</h3>
          <p className="text-gray-600 my-2">You've subscribed for the {process.env.NEXT_PUBLIC_APP_NAME} newsletter</p>
          <p> Have a great day!  </p>
          <div className="py-10 text-center">
            <Link href="/" className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
              Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
