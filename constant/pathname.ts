export const PATHNAME = {
    HOME: "/",
    USERS: "/users",
    USER_DETAIL: (userId: string) => `/users/${userId}`,
    IMAGES: "/images",
    SSG: "/ssg",
    SSR: "/ssr",
    ISR: "/isr",
    BLOG:'/blog',
    BLOG_SLUG: '/blog/slug1',
    SHOP: '/shop',
    SHOP_SLUG: '/shop/slug1',
    PARALLEL: '/parallel'
}