<script setup lang="ts">
import { faqs } from '~/data/site'

useSeo('Frequently asked questions about Catarman services', 'Answers to common questions about government services in Catarman, Northern Samar.')
</script>

<template>
  <PageHeader title="Frequently asked questions" description="Quick answers to common questions." />

  <div class="container-page max-w-3xl py-12">
    <Accordion type="single" collapsible class="rounded-lg border px-5">
      <AccordionItem v-for="(f, i) in faqs" :key="i" :value="`item-${i}`">
        <AccordionTrigger class="py-5 text-left text-base font-semibold">{{ f.q }}</AccordionTrigger>
        <AccordionContent class="text-base text-muted-foreground">{{ f.a }}</AccordionContent>
      </AccordionItem>
    </Accordion>

    <p class="mt-8 text-muted-foreground">
      Still need help?
      <NuxtLink to="/contact" class="font-semibold text-primary hover:underline">See contact details</NuxtLink>
    </p>
  </div>
</template>
