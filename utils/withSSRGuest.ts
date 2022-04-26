import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { parseCookies } from "nookies"

  // high order functiuon: função q recebe uma função ou retorna uma função e etc
export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {    
    const cookies = parseCookies(ctx) // pelo lado do server, primeiro argumento é o contexto

    if (cookies['nextauth.token']){
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        }
      }
    }

    return await fn(ctx)
  }
}