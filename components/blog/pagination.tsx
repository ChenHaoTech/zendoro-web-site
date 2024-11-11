type Props = {
  currPage: number
  maxPage: number
}

/**
 * 生成分页数组
 * @param currPage 当前页码
 * @param maxPage 最大页码
 * @param numItems 分页显示的页码数量，默认为5
 * @returns 分页数组
 */
function getPaginationArr(currPage: number, maxPage: number, numItems: number = 5) {
  // 初始化分页数组，包含当前页码
  const pageList = [currPage];
  
  // 循环填充分页数组，直到达到指定的页码数量
  while (pageList.length < numItems) {
    // 计算当前页码与数组最左边页码的差值
    const leftDelta = Math.abs(pageList[0] - currPage);
    // 计算当前页码与数组最右边页码的差值
    const rightDelta = Math.abs(pageList[pageList.length - 1] - currPage);
    
    // 根据差值和边界条件决定向左或向右扩展页码
    if ((leftDelta <= rightDelta || pageList[pageList.length - 1] == maxPage) && pageList[0] > 1) {
      // 向左扩展页码
      pageList.unshift(pageList[0] - 1);
    } else if ((leftDelta > rightDelta || pageList[0] == 1) && pageList[pageList.length - 1] < maxPage) {
      // 向右扩展页码
      pageList.push(pageList[pageList.length - 1] + 1);
    } else {
      // 如果无法继续扩展，跳出循环
      break;
    }
  }
  
  // 返回生成的分页数组
  return pageList;
}


function Pagination({ currPage, maxPage }: Props) {
  const paginationArr = getPaginationArr(currPage, maxPage);
  return (
    <div className="flex justify-center mb-10">
        <ul className="inline-flex -space-x-px">
          <li key="previous">
            {(currPage === 1) ? (
              <a className="bg-white border border-gray-300 text-gray-500 ml-0 rounded-l-lg leading-tight py-2 px-3 cursor-default">Previous</a>
            ): (
              <a href={`/posts/${currPage - 1}`}
                className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 ">Previous</a>
            )} 
          </li>
          {paginationArr.map((i) => (i === currPage) ? (
            <li key={i}>
              <a href="" aria-current="page"
                className="bg-blue-50 border border-gray-300 text-blue-600 hover:bg-blue-100 hover:text-blue-700 py-2 px-3">{i}</a>
            </li>
          ) : (
            <li key={i}>
              <a href={`/posts/${i}`}
                className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 leading-tight py-2 px-3 ">{i}</a>
            </li>
          ))}
          <li key="next">
            {(currPage === maxPage) ? (
              <a className={`bg-white border border-gray-300 text-gray-500 rounded-r-lg leading-tight py-2 px-3 cursor-default`}>Next</a>
            ): (
              <a href={`/posts/${currPage + 1}`}
                className={`bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3`}>Next</a>
            )} 
          </li>
        </ul>
    </div>
  )
}

export default Pagination;

