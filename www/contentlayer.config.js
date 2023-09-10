import {
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files"
import { remarkCodeHike } from "@code-hike/mdx"

const Articles = defineDocumentType(() => ({
  name: "Articles",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    publishedAt: {
      type: "string",
      required: true,
    },
    lastUpdated: {
      type: "string",
      required: true,
    },
    tags: {
      type: "json",
      required: true,
    },
    features: {
      type: "json",
      required: false,
    },
    category: {
      type: "string",
      required: true,
    },
    slug: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
      required: false,
    },
    imageAlt: {
      type: "string",
      required: false,
    }
  },
}))

export default makeSource({
  contentDirPath: "articles",
  documentTypes: [Articles],
  mdx: {
    remarkPlugins: [
      [
        remarkCodeHike, { 
          theme: "slack-dark",
          showCopyButton: true
        }
      ],
    ],
  },
})