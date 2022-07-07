export const pagesPath = {
  "verticalBar": {
    $url: (url?: { hash?: string }) => ({ pathname: '/verticalBar' as const, hash: url?.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath
