export const changeLoc = (href: string, newTab = true) => {
    if (!document) return
    const a = document.createElement('a')
    a.href = href
    if (newTab) {
        a.target = '_blank'
        a.rel = 'noopener noreferrer'
    }
    a.click()
}

export const goToTop = () => changeLoc('#', false)

export const getEventValue = (event: any): string => (event.target ? event.target.value : '')