import Head from "next/head";
import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0/client'
import { getSession } from "@auth0/nextjs-auth0";


export default function Home() {

  const { isLoading, error, user } = useUser()

  if (isLoading) return <div>Loading.....</div>
  if (error) return <div>{error.message}</div>


  // #171717
  return (
    <>
      <Head>
        <title>Lite ChatGPT</title>
      </Head>

      <div className=" flex justify-center items-center bg-black min-h-screen w-full text-white text-center  px-4 py-2"

      // style={{ backgroundColor: '#212121' }}
      >
        <div >
          <h1>Get Started</h1>
          {!!user &&
            <Link href="/api/auth/logout">Logout</Link>
          }
          {!user &&


            <>
              <Link href="/api/auth/login"
                className="custom-link"
              >Login</Link>
              <Link href="/api/auth/signup"
                className="custom-link"

              >Sign up</Link>
            </>
          }
        </div>


      </div>

    </>
  );
}



export const getServerSideProps = async (ctx) => {
  console.log("ctxxxxx", ctx)
  const session = await getSession(ctx.req, ctx.res);
  if (!!session) {
    return {
      redirect: {
        destination: '/chat'
      }
    }
  }
  return {
    props: {}
  }
}