import fs from 'fs'

export const deleteFile = async (filename: string) => {
  try {
    await fs.promises.stat(filename)
  } catch {
    return
  }

  await fs.promises.unlink(filename)
}

export const validationExtension = file => {
  const a = file.split('_')
  const ext = a[a.length - 2].split('.')[a[a.length - 2].split('.').length - 1]
  const ts = a[a.length - 1].split('.')[0]
  a[a.length - 1] = `${ts}.${ext}`
  return a.join('_')
}
