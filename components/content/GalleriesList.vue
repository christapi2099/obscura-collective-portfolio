<script setup lang="ts">
import { withTrailingSlash } from "ufo";

const props = defineProps({
    path: {
        type: String,
        default: "galleries",
    },
});

const { data: _galleries } = await useAsyncData(
    "galleries",
    async () => await queryContent(withTrailingSlash(props.path)).find(),
);

const galleries = computed(() => _galleries.value || []);
</script>

<template>
    <div
        v-if="galleries?.length"
        class="not-prose grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
        <div
            v-for="(gallery, index) in galleries"
            :key="index"
            v-bottom-up
            :data-delay="index * 100"
        >
            <GalleryListItem :gallery="gallery" />
        </div>
    </div>
    <div v-else>
        <p>No galleries found.</p>
    </div>
</template>
