# HLS Video Player

- Use the component from 'index.tsx' for lazyloaded experience with autoplay (RECOMMENDED).
- Use the component from 'player.tsx' directly for low-level control.

For stubbed data, use a GraphQL query similar to the one below to get content
props for a Dato video asset directly:

```graphql
query getVideoContentDirectly {
  allUploads(
    first: 3
    filter: {
      type: { eq: video }
      filename: { matches: { pattern: "glo2facial" } }
    }
    orderBy: [_updatedAt_DESC, _createdAt_ASC]
  ) {
    id
    filename
    video {
      streamingUrl
      thumbnailUrl
      width
      height
    }
  }
}
```
