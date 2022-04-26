import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next"
import { destroyCookie, parseCookies } from "nookies"
import { AuthTokenError } from "../services/errors/AuthTokenError"

// high order functiuon: função q recebe uma função ou retorna uma função e etc
export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {    
    const cookies = parseCookies(ctx) // pelo lado do server, primeiro argumento é o contexto

    if (!cookies['nextauth.token']){
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }

    try{      
      return await fn(ctx)
    }catch (err) {
      if (err instanceof AuthTokenError){
        destroyCookie(ctx, 'nextauth.token')
        destroyCookie(ctx, 'nextauth.refreshToken')
  
        return {
          redirect: {
            destination: '/',
            permanent: false,
          }
        }
      }
    }
  }
}