import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { supabase } from '../supabaseClient'
import { Input, Button, Link } from '@nextui-org/react'
import { PiWarningBold } from 'react-icons/pi'

function AuthForm({ viewMode = 'signup' }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [view, setView] = useState()

  useEffect(() => {
    setView(viewMode)
  }, [viewMode])

  const watchPassword = watch('password')

  const onSubmit = async (data) => {
    setIsLoading(true)
    const { email, password } = data
    if (view === 'signup') {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      if (data) {
        setView('signup-success')
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) setError(error.message)
    }
    setIsLoading(false)
  }

  if (view === 'signup-success') {
    return (
      <div className="flex flex-col gap-4 py-8">
        <h2 className="text-2xl font-bold">Check your email</h2>
        <p>
          We have sent a confirmation email to{' '}
          <span className="font-bold">{watch('email')}</span>
        </p>
        <p>
          Please click on the link in the email to verify your email address and
          complete the sign up process
        </p>
      </div>
    )
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 py-8"
    >
      <h2 className="text-2xl font-bold">
        {view === 'signup' ? 'Create an account' : 'Login'}
      </h2>
      <Link
        className="hover:cursor-pointer hover:text-primary-600 p-2"
        color="primary"
        variant="light"
        onClick={
          view === 'signup' ? () => setView('login') : () => setView('signup')
        }
      >
        {view === 'signup'
          ? 'Already have an account? Login'
          : "Don't have an account? Sign up"}
      </Link>
      {error && (
        <div className="flex items-center gap-2 bg-danger-50 p-3 rounded-xl border border-danger-100 font-bold text-default-900 text-sm">
          <PiWarningBold className="text-danger-300 text-2xl" />
          <p>{error}</p>
        </div>
      )}
      <Input
        {...register('email', {
          required: 'Email is required',
        })}
        type="email"
        label="Email"
        isInvalid={errors.email && true}
        errorMessage={errors.email?.message}
      />
      <Input
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters',
          },
        })}
        type="password"
        label="Password"
        isInvalid={errors.password && true}
        errorMessage={errors.password?.message}
      />
      {view === 'signup' && (
        <Input
          {...register('confirm_password', {
            required: 'Confirm password is required',
            validate: (val) => {
              if (watchPassword !== val) {
                return 'Passwords do not match'
              }
            },
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
          })}
          type="password"
          label="Confirm password"
          isInvalid={errors.confirm_password && true}
          errorMessage={errors.confirm_password?.message}
        />
      )}
      <Button
        color="secondary"
        variant="solid"
        type="submit"
        size="lg"
        isLoading={isLoading}
      >
        {view === 'signup' ? 'Create account' : 'Login'}
      </Button>
    </form>
  )
}

export default AuthForm
