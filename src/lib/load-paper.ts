import type { BlogConfig } from '@/app/blog/types'

export type { BlogConfig } from '@/app/blog/types'

export type LoadedPaper = {
	slug: string
	config: BlogConfig
	markdown: string
	cover?: string
}

/**
 * Load paper data from public/papers/{slug}
 * Used by both view page and edit page
 */
export async function loadPaper(slug: string): Promise<LoadedPaper> {
	if (!slug) {
		throw new Error('Slug is required')
	}

	// Load config.json
	let config: BlogConfig = {}
	const configRes = await fetch(`/papers/${encodeURIComponent(slug)}/config.json`)
	if (configRes.ok) {
		try {
			config = await configRes.json()
		} catch {
			config = {}
		}
	}

	// Load index.md
	const mdRes = await fetch(`/papers/${encodeURIComponent(slug)}/index.md`)
	if (!mdRes.ok) {
		throw new Error('Paper not found')
	}
	const markdown = await mdRes.text()

	return {
		slug,
		config,
		markdown,
		cover: config.cover
	}
}

