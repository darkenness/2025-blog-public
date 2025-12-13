'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import dayjs from 'dayjs'
import { motion } from 'motion/react'
import { BlogPreview } from '@/components/blog-preview'
import { loadPaper, type BlogConfig } from '@/lib/load-paper'
import { useReadArticles } from '@/hooks/use-read-articles'

export default function Page() {
	const params = useParams() as { id?: string | string[] }
	const slug = Array.isArray(params?.id) ? params.id[0] : params?.id || ''
	const router = useRouter()
	const { markAsRead } = useReadArticles()

	const [paper, setPaper] = useState<{ config: BlogConfig; markdown: string; cover?: string } | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		let cancelled = false
		async function run() {
			if (!slug) return
			try {
				setLoading(true)
				const paperData = await loadPaper(slug)

				if (!cancelled) {
					setPaper(paperData)
					setError(null)
					markAsRead(slug)
				}
			} catch (e: any) {
				if (!cancelled) setError(e?.message || '加载失败')
			} finally {
				if (!cancelled) setLoading(false)
			}
		}
		run()
		return () => {
			cancelled = true
		}
	}, [slug, markAsRead])

	const title = useMemo(() => (paper?.config.title ? paper.config.title : slug), [paper?.config.title, slug])
	const date = useMemo(() => dayjs(paper?.config.date).format('YYYY年 M月 D日'), [paper?.config.date])
	const tags = paper?.config.tags || []

	const handleEdit = () => {
		router.push(`/write/${slug}`)
	}

	if (!slug) {
		return <div className='text-secondary flex h-full items-center justify-center text-sm'>无效的链接</div>
	}

	if (loading) {
		return <div className='text-secondary flex h-full items-center justify-center text-sm'>加载中...</div>
	}

	if (error) {
		return <div className='flex h-full items-center justify-center text-sm text-red-500'>{error}</div>
	}

	if (!paper) {
		return <div className='text-secondary flex h-full items-center justify-center text-sm'>论文不存在</div>
	}

	return (
		<>
			<BlogPreview
				markdown={paper.markdown}
				title={title}
				tags={tags}
				date={date}
				summary={paper.config.summary}
				cover={paper.cover ? `${typeof window !== 'undefined' ? window.location.origin : ''}${paper.cover}` : undefined}
				slug={slug}
			/>

			<motion.button
				initial={{ opacity: 0, scale: 0.6 }}
				animate={{ opacity: 1, scale: 1 }}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				onClick={handleEdit}
				className='absolute top-4 right-6 rounded-xl border bg-white/60 px-6 py-2 text-sm backdrop-blur-sm transition-colors hover:bg-white/80 max-sm:hidden'>
				编辑
			</motion.button>
		</>
	)
}

