import { render } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { Pagination } from './pagination'

const OnPageChangeCallback = vi.fn()

describe('Pagination', () => {
  beforeEach(() => {
    OnPageChangeCallback.mockClear()
  })

  it('should display the right amount of pages and results', () => {
    const wrraper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={() => {}}
      />,
    )

    expect(wrraper.getByText('Página 1 de 20')).toBeInTheDocument()
    expect(wrraper.getByText('total de 200 itens(s)')).toBeInTheDocument()
  })

  it('should be able to navigate to the next page', async () => {
    const user = userEvent.setup()

    const wrraper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={OnPageChangeCallback}
      />,
    )

    const nextPageButton = wrraper.getByRole('button', {
      name: 'Próxima página',
    })

    await user.click(nextPageButton)

    expect(OnPageChangeCallback).toHaveBeenCalledWith(1)
  })

  it('should be able to navigate to the previous page', async () => {
    const user = userEvent.setup()

    const wrraper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={OnPageChangeCallback}
      />,
    )

    const nextPageButton = wrraper.getByRole('button', {
      name: 'Página anterior',
    })

    await user.click(nextPageButton)

    expect(OnPageChangeCallback).toHaveBeenCalledWith(4)
  })

  it('should be able to navigate to the frist page', async () => {
    const user = userEvent.setup()

    const wrraper = render(
      <Pagination
        pageIndex={5}
        totalCount={200}
        perPage={10}
        onPageChange={OnPageChangeCallback}
      />,
    )

    const nextPageButton = wrraper.getByRole('button', {
      name: 'Primeira página',
    })

    await user.click(nextPageButton)

    expect(OnPageChangeCallback).toHaveBeenCalledWith(0)
  })

  it('should be able to navigate to the last page', async () => {
    const user = userEvent.setup()

    const wrraper = render(
      <Pagination
        pageIndex={0}
        totalCount={200}
        perPage={10}
        onPageChange={OnPageChangeCallback}
      />,
    )

    const nextPageButton = wrraper.getByRole('button', {
      name: 'Última página',
    })

    await user.click(nextPageButton)

    expect(OnPageChangeCallback).toHaveBeenCalledWith(19)
  })
})
