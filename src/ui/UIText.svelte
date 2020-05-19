<script>
  let class_name = ''
  export { class_name as class }

  export let uppercase = false
  export let sizeXS = false
  export let sizeSM = false
  export let sizeMD = false
  export let sizeLG = false
  export let sizeXL = false

  export let bold = false
  export let thin = false

</script>

<div
  class:text-transform_uppercase={uppercase}
  class:text-size_md={sizeMD}
  class:text-size_xs={sizeXS}
  class:text-size_sm={sizeSM}
  class:text-size_lg={sizeLG}
  class:text-size_xl={sizeXL}
  class:font-weight_bold={bold}
  class:font-weight_thin={thin}
  class="ui-text {class_name}"
>
  <slot />
</div>