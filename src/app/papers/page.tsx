'use client'

import Link from 'next/link'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { motion } from 'motion/react'

dayjs.extend(weekOfYear)
import { useMemo } from 'react'
import { ANIMATION_DELAY, INIT_DELAY } from '@/consts'
import ShortLineSVG from '@/svgs/short-line.svg'
import { usePapersIndex, type BlogIndexItem } from '@/hooks/use-papers-index'
import { useReadArticles } from '@/hooks/use-read-articles'
import { cn } from '@/lib/utils'

type DisplayMode = 'day' | 'week' | 'month' | 'year'

export default function PapersPage() {
	const { items, loading } = usePapersIndex()
	const { isRead } = useReadArticles()
	const displayMode: DisplayMode = 'year'

	const { groupedItems, groupKeys, getGroupLabel } = useMemo(() => {
		const sorted = [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

		const grouped = sorted.reduce(
			(acc, item) => {
				let key: string
				let label: string
				const date = dayjs(item.date)

				switch (displayMode) {
					case 'day':
						key = date.format('YYYY-MM-DD')
						label = date.format('YYYY年MM月DD日')
						break
					case 'week':
						const week = date.week()
						key = `${date.format('YYYY')}-W${week.toString().padStart(2, '0')}`
						label = `${date.format('YYYY')}年第${week}周`
						break
					case 'month':
						key = date.format('YYYY-MM')
						label = date.format('YYYY年MM月')
						break
					case 'year':
					default:
						key = date.format('YYYY')
						label = date.format('YYYY年')
						break
				}

				if (!acc[key]) {
					acc[key] = { items: [], label }
				}
				acc[key].items.push(item)
				return acc
			},
			{} as Record<string, { items: BlogIndexItem[]; label: string }>
		)

		const keys = Object.keys(grouped).sort((a, b) => {
			// 按时间倒序排序
			if (displayMode === 'week') {
				// 周格式：YYYY-WW
				const [yearA, weekA] = a.split('-W').map(Number)
				const [yearB, weekB] = b.split('-W').map(Number)
				if (yearA !== yearB) return yearB - yearA
				return weekB - weekA
			}
			return b.localeCompare(a)
		})

		return {
			groupedItems: grouped,
			groupKeys: keys,
			getGroupLabel: (key: string) => grouped[key]?.label || key
		}
	}, [items, displayMode])

	return (
		<>
			<div className='flex flex-col items-center justify-center gap-6 px-6 pt-24 max-sm:pt-24'>
				{groupKeys.map((groupKey, index) => {
					const group = groupedItems[groupKey]
					if (!group) return null

					return (
						<motion.div
							key={groupKey}
							initial={{ opacity: 0, scale: 0.95 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ delay: INIT_DELAY / 2 }}
							className='card relative w-full max-w-[840px] space-y-6'>
							<div className='mb-3 flex items-center justify-between gap-3 text-base'>
								<div className='flex items-center gap-3'>
									<div className='font-medium'>{getGroupLabel(groupKey)}</div>
									<div className='h-2 w-2 rounded-full bg-[#D9D9D9]'></div>
									<div className='text-secondary text-sm'>{group.items.length} 篇论文</div>
								</div>
							</div>
							<div>
								{group.items.map(it => {
									const hasRead = isRead(it.slug)
									return (
										<Link
											href={`/papers/${it.slug}`}
											key={it.slug}
											className={cn('group flex min-h-10 items-center gap-3 py-3 transition-all cursor-pointer')}>
											<span className='text-secondary w-[44px] shrink-0 text-sm font-medium'>{dayjs(it.date).format('MM-DD')}</span>

											<div className='relative flex h-2 w-2 items-center justify-center'>
												<div className='bg-secondary group-hover:bg-brand h-[5px] w-[5px] rounded-full transition-all group-hover:h-4'></div>
												<ShortLineSVG className='absolute bottom-4' />
											</div>
											<div
												className={cn(
													'flex-1 truncate text-sm font-medium transition-all',
													'group-hover:text-brand group-hover:translate-x-2'
												)}>
												{it.title || it.slug}
												{hasRead && <span className='text-secondary ml-2 text-xs'>[已阅读]</span>}
											</div>
											<div className='flex flex-wrap items-center gap-2 max-sm:hidden'>
												{(it.tags || []).map(t => (
													<span key={t} className='text-secondary text-sm'>
														#{t}
													</span>
												))}
											</div>
										</Link>
									)
								})}
							</div>
						</motion.div>
					)
				})}
			</div>

			<div className='pt-12'>
				{!loading && items.length === 0 && <div className='text-secondary py-6 text-center text-sm'>暂无论文</div>}
				{loading && <div className='text-secondary py-6 text-center text-sm'>加载中...</div>}
			</div>
		</>
	)
}

