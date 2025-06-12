'use client'

import { useEffect, useRef, useState } from 'react'

import { getImage } from '@/services/apiServices/imageService'
import { instance } from '@/services/axios'

interface Image {
  id: string
  author: string
  download_url: string
}

export default function ImageGrid({ initialImages = [] }: { initialImages: Image[] }) {
  const [images, setImages] = useState<Image[]>(initialImages)
  const [page, setPage] = useState(2) // Already loaded page 1 server-side
  const loader = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1 })
    if (loader.current) observer.observe(loader.current)
    return () => observer.disconnect()
  }, [images])

  const handleObserver = (entries: any) => {
    const target = entries[0]
    if (target.isIntersecting) {
      setPage((prev) => prev + 1)
    }
  }

  useEffect(() => {
    if (page > 2) fetchImages()
  }, [page])

  const fetchImages = async () => {
    try {
      const config = getImage({params: { page, limit: 20 }})
      const res = await instance(config)
      setImages((prev) => [...prev, ...res.data])
    } catch (err) {
      console.error('Failed to fetch images', err)
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((img) => (
        <div key={img.id} className="overflow-hidden rounded-lg shadow-xl shadow-slate-900 hover:scale-[1.05] transition-transform duration-300">
          <img src={img.download_url} alt={img.author} className="w-full h-64 object-cover" />
        </div>
      ))}
      <div ref={loader} className="h-10"></div>
    </div>
  )
}
