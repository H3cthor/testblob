import { put } from '@vercel/blob'
import { customAlphabet } from 'nanoid'
import { NextResponse } from 'next/server'

// export const runtime = 'edge'

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
) // 7-character random string
export async function POST(req: Request) {

  const file = req.body || ''

  const contentType = req.headers.get('content-type') || 'text/plain'

  const filename = `${nanoid()}.${contentType.split('/')[1]}`
  
  const blob = await put(filename, file, {
    contentType,
    access: 'public',
  })

  return NextResponse.json(blob)
}

/////////////////////////////////////////////////////

// import { put } from '@vercel/blob'
// import { NextResponse } from 'next/server'

// export async function POST(request: Request): Promise<NextResponse> {
// //   const { searchParams } = new URL(request.url)
// //   const filename = searchParams.get('filename') 

// //   console.log(`Valor de filename: ${filename}`)

//   const blob = await put(/*filename!*/'miarchivo.jpg', request.body!, {
//     access: 'public',
//   })

//   return NextResponse.json(blob)
// }