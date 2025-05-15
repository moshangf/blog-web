export function useCopyCode() {
  const copyCode = async (event) => {
    const codeBlock = event.target.parentElement.querySelector('code')
    try {
      await navigator.clipboard.writeText(codeBlock.innerText)
      event.target.textContent = '已复制!'
      setTimeout(() => {
        event.target.textContent = '复制'
      }, 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  return {
    copyCode
  }
}