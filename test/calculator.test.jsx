import { afterEach, describe, it, expect } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import Calculator from '../src/Calculator'
import { GRID_OPERATORS, NUMBERS } from '../global/values'

describe('Calculator', () => {
  afterEach(cleanup)
  it('should render Calculator component', () => {
    render(<Calculator />)
  })

  it('should render Calculator as title', () => {
    render(<Calculator />)
    screen.getByText('Calculator')
  })

  it('should render numbers', () => {
    render(<Calculator />)
    NUMBERS.forEach(number => {
      screen.getByText(number.toString())
    })
  })

  it('should render 4 rows', () => {
    render(<Calculator />)
    GRID_OPERATORS.forEach(operation => {
      screen.getByText(operation.toString())
    })
  })

  it('should render operations', () => {
    render(<Calculator />)
    const rows = screen.getAllByRole('row')
    expect(rows.length).toBe(4)
  })

  it('should render operations', () => {
    render(<Calculator />)
    const column = screen.getAllByRole('column')
    expect(column.length).toBe(1)
  })

  it('should render Input screen', () => {
    render(<Calculator />)
    screen.getByRole('textbox')
  })

  it('should display Input content', () => {
    render(<Calculator />)
    const textScreen = screen.getByRole('textbox')
    let concat = ''
    NUMBERS.forEach(symbol => {
      const button = screen.getByText(symbol.toString())
      fireEvent.click(button)
      concat += symbol.toString()
      expect(textScreen.value).toBe(concat)
    })
  })

  it('should compute clear screen with CE buttom', () => {
    render(<Calculator />)
    const textScreen = screen.getByRole('textbox')
    const button = screen.getByText('CE')
    fireEvent.click(button)
    expect(textScreen.value).toBe('')
  })

  it('should compute clear screen on click CE buttom', () => {
    render(<Calculator />)
    const textScreen = screen.getByRole('textbox')
    NUMBERS.forEach(symbol => {
      const button = screen.getByText(symbol.toString())
      fireEvent.click(button)
      fireEvent.click(screen.getByText('CE'))
      expect(textScreen.value).toBe('')
    })
  })

  it('should allow only sequence number, operator', () => {
    render(<Calculator />)
    const textScreen = screen.getByRole('textbox')
    fireEvent.click(screen.getByText('1'))
    fireEvent.click(screen.getByText('*'))
    fireEvent.click(screen.getByText('/'))
    expect(textScreen.value).toBe('1/')
  })

  it('should compute * operator', () => {
    render(<Calculator />)
    const textScreen = screen.getByRole('textbox')
    const button = screen.getByText('2')
    fireEvent.click(button)
    fireEvent.click(screen.getByText('*'))
    fireEvent.click(button)
    expect(textScreen.value).toBe('2*2')
    fireEvent.click(screen.getByText('='))
    expect(textScreen.value).toBe('4')
  })

  it('should compute / operator', () => {
    render(<Calculator />)
    const textScreen = screen.getByRole('textbox')
    const button = screen.getByText('2')
    fireEvent.click(button)
    fireEvent.click(screen.getByText('/'))
    fireEvent.click(button)
    expect(textScreen.value).toBe('2/2')
    fireEvent.click(screen.getByText('='))
    expect(textScreen.value).toBe('1')
  })

  it('should compute + operator', () => {
    render(<Calculator />)
    const textScreen = screen.getByRole('textbox')
    const button = screen.getByText('2')
    fireEvent.click(button)
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(button)
    expect(textScreen.value).toBe('2+2')
    fireEvent.click(screen.getByText('='))
    expect(textScreen.value).toBe('4')
  })

  it('should compute - operator', () => {
    render(<Calculator />)
    const textScreen = screen.getByRole('textbox')
    const button = screen.getByText('2')
    fireEvent.click(button)
    fireEvent.click(screen.getByText('-'))
    fireEvent.click(button)
    expect(textScreen.value).toBe('2-2')
    fireEvent.click(screen.getByText('='))
    expect(textScreen.value).toBe('0')
  })

  it('should clear screen afther compute = ', () => {
    render(<Calculator />)
    const textScreen = screen.getByRole('textbox')
    const button = screen.getByText('2')
    fireEvent.click(button)
    fireEvent.click(screen.getByText('-'))
    fireEvent.click(button)
    expect(textScreen.value).toBe('2-2')
    fireEvent.click(screen.getByText('='))
    expect(textScreen.value).toBe('0')
    fireEvent.click(button)
    expect(textScreen.value).toBe('2')
  })

  it('should display 0 + symbol if not number provide first', () => {
    render(<Calculator />)
    const textScreen = screen.getByRole('textbox')
    fireEvent.click(screen.getByText('*'))
    expect(textScreen.value).toBe('0*')
    fireEvent.click(screen.getByText('+'))
    expect(textScreen.value).toBe('0+')
    fireEvent.click(screen.getByText('-'))
    expect(textScreen.value).toBe('0-')
    fireEvent.click(screen.getByText('/'))
    expect(textScreen.value).toBe('0/')
  })

  it('should display 0 + symbol afther and = operation', () => {
    render(<Calculator />)
    const textScreen = screen.getByRole('textbox')
    const button = screen.getByText('2')
    fireEvent.click(button)
    fireEvent.click(screen.getByText('+'))
    fireEvent.click(button)
    expect(textScreen.value).toBe('2+2')
    fireEvent.click(screen.getByText('='))
    expect(textScreen.value).toBe('4')
    fireEvent.click(screen.getByText('*'))
    expect(textScreen.value).toBe('0*')
  })

  it('should return if not values to compute on click = ', () => {
    render(<Calculator />)
    const textScreen = screen.getByRole('textbox')
    const button = screen.getByText('=')
    fireEvent.click(button)
    expect(textScreen.value).toBe('')
  })
})
