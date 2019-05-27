<template>
  <div class="works full-height full-width">
    <div class="works__title">
      <h1>My works</h1>
      <hr class="separator" />
    </div>

    <div class="project">
      <div class="project__bar">
        <div class="project__dots">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <div class="project__title">my personal website</div>
        <div class="project__bar-void"></div>
      </div>
      <div class="project__thumbnail"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.works {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    position: relative;
    display: inline-block;
    margin-top: 10%;
    hr {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}

.project {
  width: 40rem;
  height: 22.5rem;
  margin-top: 7rem;
  background: red;

  &__bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 2.2rem;
    padding: 0 1rem;
    background: lightgrey;
  }

  &__title {
    color: black;
    text-transform: uppercase;
    font-weight: 600;
  }

  &__dots,
  &__bar-void {
    width: 5rem;
  }

  &__dots {
    .dot {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;

      &:first-child {
        background: crimson;
      }

      &:nth-child(2) {
        background: gold;
      }

      &:last-child {
        background: limegreen;
      }

      &:not(:last-child) {
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
