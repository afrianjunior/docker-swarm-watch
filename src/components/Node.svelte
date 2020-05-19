<script>
  import { UIText, UIContainer } from 'ui'
  import Container from './Container.svelte'
  import toByteFormat from '@/lib/toByteFormat'

  export let name = '-'
  export let type = '-'
  export let architecture = '-'
  export let os = '-'
  export let memory = '-'
  export let addr = '-'
  export let tasks = []

  $: show = tasks.length
</script>

<UIContainer
  rounded="lg"
  margin="sm"
  model="card"
  background="primary"
>
  <div class="padding-bottom_xs margin-bottom_md border_bottom">
    <UIText uppercase sizeSM>
      {type}
    </UIText>
    <UIText bold sizeLG class="margin-bottom_xl">
      {name}
    </UIText>
    <UIText sizeXS class="text-color_gray">
      {architecture}/{os} | {toByteFormat(memory)} | {addr}
    </UIText>
  </div>

  <div class="node-container-wrapper">
    {#each tasks as task, i}
      {#if task.Service} 
        <Container
          name={task.Service.Spec.Name}
          status={task.Status.State}
          date={task.UpdatedAt}
        />
      {/if}
    {/each}
  </div>
</UIContainer>