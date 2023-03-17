/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable no-param-reassign */

async function orderPosition (data: any) {
  const ranking = data?.map((item, index) => {
    if (index == 0) item.diff = 0
    if (index > 0 && index < 3) { item.diff = item.points - data[index - 1].points }
    if (index >= 3) item.diff = item.points - data[2].points

    item.position = index + 1

    return item
  })

  return ranking
}

export { orderPosition }
