<template>
  <transition
    enter-active-class="transform ease-out duration-500 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4 scale-95"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0 scale-100"
    leave-active-class="transition ease-in duration-300"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="show"
      class="fixed top-4 right-4 z-50 max-w-sm w-full bg-white shadow-2xl rounded-2xl border border-gray-200 pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden backdrop-blur-sm"
    >
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <!-- Success Icon -->
            <div
              v-if="type === 'success'"
              class="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full"
            >
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <!-- Error Icon -->
            <div
              v-else-if="type === 'error'"
              class="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full"
            >
              <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            
            <!-- Warning Icon -->
            <div
              v-else-if="type === 'warning'"
              class="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-full"
            >
              <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            
            <!-- Info Icon -->
            <div
              v-else
              class="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full"
            >
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          
          <div class="ml-3 w-0 flex-1">
            <p v-if="title" class="text-sm font-semibold text-gray-900">{{ title }}</p>
            <p class="text-sm text-gray-600" :class="{ 'mt-1': title }">{{ message }}</p>
            
            <!-- Progress Bar for Success with Redirect -->
            <div v-if="type === 'success' && showProgress" class="mt-3">
              <div class="bg-gray-200 rounded-full h-1">
                <div 
                  class="bg-green-500 h-1 rounded-full transition-all duration-100 ease-linear"
                  :style="{ width: progressWidth + '%' }"
                ></div>
              </div>
              <p class="text-xs text-gray-500 mt-1">Mengalihkan dalam {{ Math.ceil(remainingTime / 1000) }} detik...</p>
            </div>
          </div>
          
          <div class="ml-4 flex-shrink-0 flex">
            <button
              @click="close"
              class="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <span class="sr-only">Close</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, watch, onMounted, onUnmounted } from 'vue'

export default {
  name: 'Toast',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'info', // success, error, warning, info
      validator: (value) => ['success', 'error', 'warning', 'info'].includes(value)
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 1500 // 1.5 seconds
    },
    showProgress: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props, { emit }) {
    const progressWidth = ref(0)
    const remainingTime = ref(props.duration)
    let timer = null
    let progressTimer = null

    const close = () => {
      emit('close')
    }

    const startAutoClose = () => {
      if (props.duration > 0) {
        timer = setTimeout(() => {
          close()
        }, props.duration)
      }
    }

    const startProgress = () => {
      if (props.showProgress && props.duration > 0) {
        const interval = 100 // Update every 100ms
        const steps = props.duration / interval
        let currentStep = 0

        progressTimer = setInterval(() => {
          currentStep++
          progressWidth.value = (currentStep / steps) * 100
          remainingTime.value = props.duration - (currentStep * interval)

          if (currentStep >= steps) {
            clearInterval(progressTimer)
          }
        }, interval)
      }
    }

    const clearTimers = () => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      if (progressTimer) {
        clearInterval(progressTimer)
        progressTimer = null
      }
    }

    watch(() => props.show, (newValue) => {
      if (newValue) {
        progressWidth.value = 0
        remainingTime.value = props.duration
        startAutoClose()
        startProgress()
      } else {
        clearTimers()
      }
    })

    onMounted(() => {
      if (props.show) {
        startAutoClose()
        startProgress()
      }
    })

    onUnmounted(() => {
      clearTimers()
    })

    return {
      progressWidth,
      remainingTime,
      close
    }
  }
}
</script>
