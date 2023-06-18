<script setup>
const route = useRoute()

defineOgImageStatic({
  component: 'DaniniOgImage',
  text: 'blog'
})
</script>

<template>
  <ArticleLayout>
      <header>
        <ContentQuery :path="route.path" v-slot="{ data }" find="one">
          <OgImageStatic component="PostOgImage" :title="data.title" :date="data.publishedAt"/>
          <TagsList :tags="data.tags" />
          <span class="date">{{formatDate(data.publishedAt)}}</span>
        </ContentQuery>
      </header>
      <ContentDoc class="content-doc" />
  </ArticleLayout>
</template>

<style scoped lang="scss">
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.date {
  color: #818181;
  font-family: 'Caveat', cursive;
  transform: rotate(-5deg);
  margin-right: 8px;
  position: relative;
  top: 4px;
}
</style>

<style lang="scss">
@use 'sass:math';

.content-doc {
  h1 {
    margin-top: 0;
    font-size: 2rem;
  }

  h2, h3, h4, h5, h6 {
    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        // text-decoration: underline;

        &::after {
          content: ' ¶'
        }
      }
    }
  }

  code {
    background: #eee;
    border: 1px solid #ddd;
    color: #3b4351;
    font-family: SFMono-Regular,Cascadia Code,Consolas,Liberation Mono,Menlo,Monaco,"Andale Mono","Ubuntu Mono",monospace;
    border-radius: 4px;
    padding: 0 4px;
    white-space: nowrap;
    display: inline-block;
    vertical-align: baseline;
    font-size: 0.9em;
  }

  pre {
    background-color: #161b22;
    position: relative;
    overflow-x: auto;
    padding: 12px 0;
    box-shadow: 6px 4px 0px rgba(0, 0, 0, 0.2);

    code {
      padding: 0 12px 0 0;
      border-radius: 0;
      display: block;
      width: fit-content;
      background: transparent;
      color: #e6edf3;
      border: 0;
      font-size: inherit;
    }

    span.line:not(:only-child) {
      &:before {
        content: attr(line);
        margin-right: 24px; 
        color: #6e7681;
        text-align: right;
        display: inline-block;
        width: 32px;
      }
    }

    span.line:only-child {
      padding-left: 12px;
    }
  }

  img {
    width: 100%;
    height: auto;
    box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.2);
    border: 1px solid black;
    transition: box-shadow 200ms ease-in-out;
  }

  a:hover img {
    box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.2);
  }

  blockquote {
    margin: 0;
    padding: 0 12px;
    position: relative;
    font-style: italic;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      width: 2px;
      background: #55ecc9;
      box-shadow: 2px 2px 0 black;
    }
  }

  figcaption, figure, main {
    display: block;
  }

  .figure {
    margin: 0 0 4px;
    
    .figure-caption {
      color: #66758c
    }
  }

  .text-center {
    text-align: center;
  }

  .columns {
    display: flex;
    gap: 16px;

    @for $i from 1 through 12 {
      .col-#{$i} {
        width: math.div($i, 12) * 100%;
      }
    }
  }
}
</style>