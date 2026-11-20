<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'

export interface ContentsItem { id: string, label: string, children?: ContentsItem[] }

const props = defineProps<{ items: ContentsItem[] }>()
const { t } = useT()

const flat = computed(() => props.items.flatMap(i => [i, ...(i.children ?? [])]))
const active = ref(props.items[0]?.id)

function update() {
  let current = flat.value[0]?.id
  for (const item of flat.value) {
    const el = document.getElementById(item.id)
    if (el && !el.closest('[hidden]') && el.getBoundingClientRect().top <= 120) current = item.id
  }
  active.value = current
}

let frame = 0
const onScroll = () => {
  cancelAnimationFrame(frame)
  frame = requestAnimationFrame(update)
}
onMounted(() => {
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('hashchange', onScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('hashchange', onScroll)
})

const open = ref(false)
</script>

<template>
  <Collapsible v-model:open="open" :unmount-on-hide="false" class="border bg-background lg:hidden">
    <CollapsibleTrigger class="group flex w-full cursor-pointer items-center gap-2 px-5 py-4 text-left font-semibold">
      <ChevronRight class="size-4 shrink-0 transition-transform group-data-[state=open]:rotate-90" aria-hidden="true" />{{ t('Contents') }}
    </CollapsibleTrigger>
    <CollapsibleContent>
      <nav :aria-label="t('Contents')" class="border-t px-5 py-3">
        <ul class="space-y-1 text-sm">
          <li v-for="item in items" :key="item.id">
            <a :href="`#${item.id}`" class="block py-1.5 hover:text-primary" @click="open = false">{{ t(item.label) }}</a>
            <ul v-if="item.children?.length" class="space-y-1 pl-4">
              <li v-for="child in item.children" :key="child.id">
                <a :href="`#${child.id}`" class="block py-1.5 text-muted-foreground hover:text-primary" @click="open = false">{{ t(child.label) }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </CollapsibleContent>
  </Collapsible>

  <nav :aria-label="t('Contents')" class="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto border bg-background p-5 lg:block">
    <p class="mb-3 font-semibold">{{ t('Contents') }}</p>
    <ul class="space-y-0.5 text-sm">
      <li v-for="item in items" :key="item.id">
        <a
          :href="`#${item.id}`"
          :aria-current="active === item.id ? 'location' : undefined"
          class="block border-l-2 py-1.5 pl-3 transition-colors hover:text-primary"
          :class="active === item.id ? 'border-primary font-semibold text-primary' : 'border-transparent'"
        >{{ t(item.label) }}</a>
        <ul v-if="item.children?.length" class="space-y-0.5">
          <li v-for="child in item.children" :key="child.id">
            <a
              :href="`#${child.id}`"
              :aria-current="active === child.id ? 'location' : undefined"
              class="block border-l-2 py-1.5 pl-6 transition-colors hover:text-primary"
              :class="active === child.id ? 'border-primary font-semibold text-primary' : 'border-transparent text-muted-foreground'"
            >{{ t(child.label) }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
