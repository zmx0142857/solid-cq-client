import clsx from 'clsx'
import type { Component } from 'solid-js'
import { Show, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import { onClickOutside, useMagicKeys, whenever } from 'solidjs-use'

// type KeyboardDivEvent = KeyboardEvent & {
//   currentTarget: HTMLDivElement
//   target: Element
// }

const ZoomedImg: Component<{
  url: string
  setZoomImg: (v: boolean) => any
}> = (props) => {
  const { escape } = useMagicKeys()
  const [imgRef, setImgRef] = createSignal<HTMLImageElement>()
  whenever(escape, () => {
    props.setZoomImg(false)
  })
  onClickOutside(imgRef, () => {
    props.setZoomImg(false)
  })
  return (
    <div
      class={clsx(
        'fixed',
        'flex',
        'left-0', 'right-0', 'top-0', 'bottom-0',
        'z-99',
        'items-center',
        'justify-center',
        'bg-zinc-800/70',
      )}
    >
      <img
        ref={r => setImgRef(r)}
        src={props.url}
        class={clsx('max-w-90%', 'max-h-90%', 'shadow')}
        referrerPolicy="no-referrer"
        alt='图片'
      />
      <div
        class={clsx(
          'absolute',
          'p-4',
          'top-4', 'right-4',
          'bg-zinc-800/70',
          'rounded-full',
          'flex space-x-4',
        )}
      >
        <a href={props.url} referrerPolicy='no-referrer' download='图片' target='_blank'>
          <div class={clsx('i-teenyicons-download-solid', 'text-2rem', 'text-white', 'hover:text-blue')} />
        </a>
        <div
          class={clsx(
            'i-teenyicons-x-solid',
            'text-2rem',
            'cursor-pointer',
            'text-white',
            'hover:text-blue',
          )}
          onClick={() => props.setZoomImg(false)}
        />
      </div>
    </div>
  )
}

const ImageMessageShown: Component<{
  url: string
}> = (props) => {
  const [zoomImg, setZoomImg] = createSignal(false)
  return (
    <>
      <img
        src={props.url}
        onClick={() => setZoomImg(true)}
        class={clsx('cursor-zoom-in')}
        referrerPolicy="no-referrer"
        alt='图片'
        style={{ 'max-width': '200px' }}
      />
      <Show when={zoomImg()}>
        <Portal mount={document.querySelector('body')!}>
          <ZoomedImg url={props.url} setZoomImg={setZoomImg} />
        </Portal>
      </Show>
    </>
  )
}

export {
  ImageMessageShown,
}
