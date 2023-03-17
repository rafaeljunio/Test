import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'

let dateProvider: DayjsDateProvider

describe('List SimulatorProjected', () => {
  beforeEach(() => {
    dateProvider = new DayjsDateProvider()
  })

  it('should be able to validate current month', () => {
    const isCurrentMonth = dateProvider.isCurrentMonth(
      new Date('2022-03-01T03:00:00.000Z')
    )
  })
})
