<script>
  let class_name = ''
  export { class_name as class }
  export let model = 'canvas'
  export let background = 'clear'
  export let padding = 'lg'
  export let margin = 'none'
  export let rounded = 'none'

  const modelCanvas = model === 'canvas'
  const modelCard = model === 'card'

  const bgClear = background === 'clear'
  const bgPrimary = background === 'primary'

  const roundedMD = rounded === 'md'
  const roundedLG = rounded === 'lg'

  const paddingSM = padding === 'sm'
  const paddingLG = padding === 'lg'
  const paddingNONE = padding === 'none'

  const marginSM = margin === 'sm'
  const marginLG = margin === 'lg'
  const marginNONE = margin === 'none'
</script>

<div
  class:container_canvas={modelCanvas}
  class:container_card={modelCard}

  class:bg_clear={bgClear}
  class:bg_primary={bgPrimary}

  class:rounded={roundedMD}
  class:rounded_lg={roundedLG}

  class:container-padding_none={paddingNONE}
  class:container-padding_sm={paddingSM}
  class:container-padding_lg={paddingLG}

  class:container-margin_none={marginNONE}
  class:container-margin_sm={marginSM}
  class:container-margin_lg={marginLG}

  class="container {class_name}"
>
  <slot />
</div>