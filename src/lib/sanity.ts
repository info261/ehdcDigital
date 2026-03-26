import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '6f6ntvoa',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

// Types
export interface SanityProject {
  _id: string
  title: string
  image?: string
  videoUrl?: string
}

export interface SanityTestimonial {
  _id: string
  quote: string
  author: string
  company: string
  avatar?: string
}

// Fetch all projects from Sanity
export async function getProjects(): Promise<SanityProject[]> {
  return client.fetch(`
    *[_type == "project"] | order(order asc) {
      _id,
      title,
      "image": image.asset->url,
      videoUrl
    }
  `)
}

// Fetch all testimonials from Sanity
export async function getTestimonials(): Promise<SanityTestimonial[]> {
  return client.fetch(`
    *[_type == "testimonial"] | order(order asc) {
      _id,
      quote,
      author,
      company,
      "avatar": coalesce(avatar.asset->url, avatarUrl)
    }
  `)
}
