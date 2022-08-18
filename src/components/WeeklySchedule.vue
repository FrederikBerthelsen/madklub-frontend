<template> 
  <div class="weeklySchedule">
    <!-- <div class="divider is-primary"><p class="divider-tag">Uge 34</p></div> -->
    <div class="box">
      <div class="columns is-flex is-vcentered">
        <div class="column is-2">
          <b-tag type="is-primary" size="is-medium">Uge 34</b-tag>
        </div>
        <div class="column is-9 is-offset-1">
          <b-taglist>
            <b-tag type="is-info" size="is-medium">dorte</b-tag>
            <b-tag type="is-info" size="is-medium">peter</b-tag>
            <b-tag type="is-info" size="is-medium">jens</b-tag>
            <b-tag type="is-info" size="is-medium">augusta</b-tag>
          </b-taglist>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box {
  margin-bottom: 1rem;
}
</style>
