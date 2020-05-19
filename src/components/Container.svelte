<script>
  import { UIText, UIContainer } from 'ui'
  import colorCollections from '../lib/colorCollections.json'
  import toRelativeDate from '@/lib/toRelativeDate'
  import getInitialCharOfName from '@/lib/getInitialCharOfName'

  export let name = '-'
  export let date = '-'
  export let status = '-'

  const initialChar = getInitialCharOfName(name)

  let colors = []

  function getRandomInt (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function getColor () {
    let integer = getRandomInt(0, colorCollections.colors.length)

    return colorCollections.colors[integer]
  }

  function colorOnly () {
    let color = getColor()

    if (colors.includes(color)) return getColor()
    colors.push(color)

    return `background-color: ${color}`
  }
</script>

<UIContainer
  rounded="md"
  model="canvas"
  padding="sm"
>
  <div class="display_flex">
    <div class="label-container" style={colorOnly()}>
      <div class="label-container-pattern">
        {initialChar}
      </div>
    </div>
    <div class="padding-left_md">
      <UIText sizeMD class="margin-bottom_xs">
        {name} ({status})
      </UIText>
      <UIText sizeSM>
        Update: {toRelativeDate(date)}
      </UIText>
    </div>
  </div>
</UIContainer>
