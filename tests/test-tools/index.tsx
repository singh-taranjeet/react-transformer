import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

const App = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>Section</h1>
      <main>
        <h2>Main section</h2>
        {children}
      </main>
    </div>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => render(ui, { wrapper: App, ...options })

export * from '@testing-library/react'
export { customRender as render }
