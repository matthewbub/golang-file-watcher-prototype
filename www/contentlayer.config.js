import {
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files"
import { remarkCodeHike } from "@code-hike/mdx"

const Article = defineDocumentType(() => ({
  name: "Article",
  filePathPattern: '**/*.mdx',
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
    lastUpdated: {
      type: "string",
      required: true,
    },
    dependencies: {
      type: "json",
      required: true,
    },
    category: {
      type: "string",
      required: true,
    },
    slug: {
      type: "string",
      required: true,
    },
  },
}));

const Legal = defineDocumentType(() => ({
  name: "Legal",
  filePathPattern: '**/*.mdx',
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    datePublished: {
      type: "string",
      required: true,
    },
    lastUpdated: {
      type: "string",
      required: true,
    },
    slug: {
      type: "string",
      required: true,
    },
  },
}));

export default makeSource({
  contentDirPath: "articles",
  documentTypes: [Article, Legal],
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