
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Activity
 * 
 */
export type Activity = $Result.DefaultSelection<Prisma.$ActivityPayload>
/**
 * Model ScheduleSlot
 * 
 */
export type ScheduleSlot = $Result.DefaultSelection<Prisma.$ScheduleSlotPayload>
/**
 * Model ExpenseAccount
 * 
 */
export type ExpenseAccount = $Result.DefaultSelection<Prisma.$ExpenseAccountPayload>
/**
 * Model ExpenseCategory
 * 
 */
export type ExpenseCategory = $Result.DefaultSelection<Prisma.$ExpenseCategoryPayload>
/**
 * Model ExpenseSubcategory
 * 
 */
export type ExpenseSubcategory = $Result.DefaultSelection<Prisma.$ExpenseSubcategoryPayload>
/**
 * Model ExpenseEntry
 * 
 */
export type ExpenseEntry = $Result.DefaultSelection<Prisma.$ExpenseEntryPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AuthRole: {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
  SUPPORT: 'SUPPORT'
};

export type AuthRole = (typeof AuthRole)[keyof typeof AuthRole]


export const ScheduleDay: {
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY',
  SUNDAY: 'SUNDAY'
};

export type ScheduleDay = (typeof ScheduleDay)[keyof typeof ScheduleDay]


export const ExpenseEntryType: {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE',
  TRANSFER: 'TRANSFER'
};

export type ExpenseEntryType = (typeof ExpenseEntryType)[keyof typeof ExpenseEntryType]

}

export type AuthRole = $Enums.AuthRole

export const AuthRole: typeof $Enums.AuthRole

export type ScheduleDay = $Enums.ScheduleDay

export const ScheduleDay: typeof $Enums.ScheduleDay

export type ExpenseEntryType = $Enums.ExpenseEntryType

export const ExpenseEntryType: typeof $Enums.ExpenseEntryType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activity`: Exposes CRUD operations for the **Activity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Activities
    * const activities = await prisma.activity.findMany()
    * ```
    */
  get activity(): Prisma.ActivityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.scheduleSlot`: Exposes CRUD operations for the **ScheduleSlot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ScheduleSlots
    * const scheduleSlots = await prisma.scheduleSlot.findMany()
    * ```
    */
  get scheduleSlot(): Prisma.ScheduleSlotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.expenseAccount`: Exposes CRUD operations for the **ExpenseAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExpenseAccounts
    * const expenseAccounts = await prisma.expenseAccount.findMany()
    * ```
    */
  get expenseAccount(): Prisma.ExpenseAccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.expenseCategory`: Exposes CRUD operations for the **ExpenseCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExpenseCategories
    * const expenseCategories = await prisma.expenseCategory.findMany()
    * ```
    */
  get expenseCategory(): Prisma.ExpenseCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.expenseSubcategory`: Exposes CRUD operations for the **ExpenseSubcategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExpenseSubcategories
    * const expenseSubcategories = await prisma.expenseSubcategory.findMany()
    * ```
    */
  get expenseSubcategory(): Prisma.ExpenseSubcategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.expenseEntry`: Exposes CRUD operations for the **ExpenseEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExpenseEntries
    * const expenseEntries = await prisma.expenseEntry.findMany()
    * ```
    */
  get expenseEntry(): Prisma.ExpenseEntryDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Activity: 'Activity',
    ScheduleSlot: 'ScheduleSlot',
    ExpenseAccount: 'ExpenseAccount',
    ExpenseCategory: 'ExpenseCategory',
    ExpenseSubcategory: 'ExpenseSubcategory',
    ExpenseEntry: 'ExpenseEntry'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "activity" | "scheduleSlot" | "expenseAccount" | "expenseCategory" | "expenseSubcategory" | "expenseEntry"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Activity: {
        payload: Prisma.$ActivityPayload<ExtArgs>
        fields: Prisma.ActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findFirst: {
            args: Prisma.ActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findMany: {
            args: Prisma.ActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          create: {
            args: Prisma.ActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          createMany: {
            args: Prisma.ActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          delete: {
            args: Prisma.ActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          update: {
            args: Prisma.ActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          deleteMany: {
            args: Prisma.ActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          upsert: {
            args: Prisma.ActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          aggregate: {
            args: Prisma.ActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivity>
          }
          groupBy: {
            args: Prisma.ActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityCountAggregateOutputType> | number
          }
        }
      }
      ScheduleSlot: {
        payload: Prisma.$ScheduleSlotPayload<ExtArgs>
        fields: Prisma.ScheduleSlotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ScheduleSlotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleSlotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ScheduleSlotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleSlotPayload>
          }
          findFirst: {
            args: Prisma.ScheduleSlotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleSlotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ScheduleSlotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleSlotPayload>
          }
          findMany: {
            args: Prisma.ScheduleSlotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleSlotPayload>[]
          }
          create: {
            args: Prisma.ScheduleSlotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleSlotPayload>
          }
          createMany: {
            args: Prisma.ScheduleSlotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ScheduleSlotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleSlotPayload>[]
          }
          delete: {
            args: Prisma.ScheduleSlotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleSlotPayload>
          }
          update: {
            args: Prisma.ScheduleSlotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleSlotPayload>
          }
          deleteMany: {
            args: Prisma.ScheduleSlotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ScheduleSlotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ScheduleSlotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleSlotPayload>[]
          }
          upsert: {
            args: Prisma.ScheduleSlotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ScheduleSlotPayload>
          }
          aggregate: {
            args: Prisma.ScheduleSlotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateScheduleSlot>
          }
          groupBy: {
            args: Prisma.ScheduleSlotGroupByArgs<ExtArgs>
            result: $Utils.Optional<ScheduleSlotGroupByOutputType>[]
          }
          count: {
            args: Prisma.ScheduleSlotCountArgs<ExtArgs>
            result: $Utils.Optional<ScheduleSlotCountAggregateOutputType> | number
          }
        }
      }
      ExpenseAccount: {
        payload: Prisma.$ExpenseAccountPayload<ExtArgs>
        fields: Prisma.ExpenseAccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExpenseAccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseAccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExpenseAccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseAccountPayload>
          }
          findFirst: {
            args: Prisma.ExpenseAccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseAccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExpenseAccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseAccountPayload>
          }
          findMany: {
            args: Prisma.ExpenseAccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseAccountPayload>[]
          }
          create: {
            args: Prisma.ExpenseAccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseAccountPayload>
          }
          createMany: {
            args: Prisma.ExpenseAccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExpenseAccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseAccountPayload>[]
          }
          delete: {
            args: Prisma.ExpenseAccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseAccountPayload>
          }
          update: {
            args: Prisma.ExpenseAccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseAccountPayload>
          }
          deleteMany: {
            args: Prisma.ExpenseAccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExpenseAccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExpenseAccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseAccountPayload>[]
          }
          upsert: {
            args: Prisma.ExpenseAccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseAccountPayload>
          }
          aggregate: {
            args: Prisma.ExpenseAccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExpenseAccount>
          }
          groupBy: {
            args: Prisma.ExpenseAccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExpenseAccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExpenseAccountCountArgs<ExtArgs>
            result: $Utils.Optional<ExpenseAccountCountAggregateOutputType> | number
          }
        }
      }
      ExpenseCategory: {
        payload: Prisma.$ExpenseCategoryPayload<ExtArgs>
        fields: Prisma.ExpenseCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExpenseCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExpenseCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>
          }
          findFirst: {
            args: Prisma.ExpenseCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExpenseCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>
          }
          findMany: {
            args: Prisma.ExpenseCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>[]
          }
          create: {
            args: Prisma.ExpenseCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>
          }
          createMany: {
            args: Prisma.ExpenseCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExpenseCategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>[]
          }
          delete: {
            args: Prisma.ExpenseCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>
          }
          update: {
            args: Prisma.ExpenseCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>
          }
          deleteMany: {
            args: Prisma.ExpenseCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExpenseCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExpenseCategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>[]
          }
          upsert: {
            args: Prisma.ExpenseCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseCategoryPayload>
          }
          aggregate: {
            args: Prisma.ExpenseCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExpenseCategory>
          }
          groupBy: {
            args: Prisma.ExpenseCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExpenseCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExpenseCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<ExpenseCategoryCountAggregateOutputType> | number
          }
        }
      }
      ExpenseSubcategory: {
        payload: Prisma.$ExpenseSubcategoryPayload<ExtArgs>
        fields: Prisma.ExpenseSubcategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExpenseSubcategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseSubcategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExpenseSubcategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseSubcategoryPayload>
          }
          findFirst: {
            args: Prisma.ExpenseSubcategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseSubcategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExpenseSubcategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseSubcategoryPayload>
          }
          findMany: {
            args: Prisma.ExpenseSubcategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseSubcategoryPayload>[]
          }
          create: {
            args: Prisma.ExpenseSubcategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseSubcategoryPayload>
          }
          createMany: {
            args: Prisma.ExpenseSubcategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExpenseSubcategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseSubcategoryPayload>[]
          }
          delete: {
            args: Prisma.ExpenseSubcategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseSubcategoryPayload>
          }
          update: {
            args: Prisma.ExpenseSubcategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseSubcategoryPayload>
          }
          deleteMany: {
            args: Prisma.ExpenseSubcategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExpenseSubcategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExpenseSubcategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseSubcategoryPayload>[]
          }
          upsert: {
            args: Prisma.ExpenseSubcategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseSubcategoryPayload>
          }
          aggregate: {
            args: Prisma.ExpenseSubcategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExpenseSubcategory>
          }
          groupBy: {
            args: Prisma.ExpenseSubcategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExpenseSubcategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExpenseSubcategoryCountArgs<ExtArgs>
            result: $Utils.Optional<ExpenseSubcategoryCountAggregateOutputType> | number
          }
        }
      }
      ExpenseEntry: {
        payload: Prisma.$ExpenseEntryPayload<ExtArgs>
        fields: Prisma.ExpenseEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExpenseEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExpenseEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseEntryPayload>
          }
          findFirst: {
            args: Prisma.ExpenseEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExpenseEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseEntryPayload>
          }
          findMany: {
            args: Prisma.ExpenseEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseEntryPayload>[]
          }
          create: {
            args: Prisma.ExpenseEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseEntryPayload>
          }
          createMany: {
            args: Prisma.ExpenseEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExpenseEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseEntryPayload>[]
          }
          delete: {
            args: Prisma.ExpenseEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseEntryPayload>
          }
          update: {
            args: Prisma.ExpenseEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseEntryPayload>
          }
          deleteMany: {
            args: Prisma.ExpenseEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExpenseEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExpenseEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseEntryPayload>[]
          }
          upsert: {
            args: Prisma.ExpenseEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExpenseEntryPayload>
          }
          aggregate: {
            args: Prisma.ExpenseEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExpenseEntry>
          }
          groupBy: {
            args: Prisma.ExpenseEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExpenseEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExpenseEntryCountArgs<ExtArgs>
            result: $Utils.Optional<ExpenseEntryCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    activity?: ActivityOmit
    scheduleSlot?: ScheduleSlotOmit
    expenseAccount?: ExpenseAccountOmit
    expenseCategory?: ExpenseCategoryOmit
    expenseSubcategory?: ExpenseSubcategoryOmit
    expenseEntry?: ExpenseEntryOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    activities: number
    schedule_slots: number
    expense_accounts: number
    expense_entries: number
    categories: number
    subcategories: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activities?: boolean | UserCountOutputTypeCountActivitiesArgs
    schedule_slots?: boolean | UserCountOutputTypeCountSchedule_slotsArgs
    expense_accounts?: boolean | UserCountOutputTypeCountExpense_accountsArgs
    expense_entries?: boolean | UserCountOutputTypeCountExpense_entriesArgs
    categories?: boolean | UserCountOutputTypeCountCategoriesArgs
    subcategories?: boolean | UserCountOutputTypeCountSubcategoriesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSchedule_slotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleSlotWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountExpense_accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseAccountWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountExpense_entriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseEntryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseCategoryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSubcategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseSubcategoryWhereInput
  }


  /**
   * Count Type ActivityCountOutputType
   */

  export type ActivityCountOutputType = {
    schedule_slots: number
  }

  export type ActivityCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    schedule_slots?: boolean | ActivityCountOutputTypeCountSchedule_slotsArgs
  }

  // Custom InputTypes
  /**
   * ActivityCountOutputType without action
   */
  export type ActivityCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityCountOutputType
     */
    select?: ActivityCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ActivityCountOutputType without action
   */
  export type ActivityCountOutputTypeCountSchedule_slotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleSlotWhereInput
  }


  /**
   * Count Type ExpenseAccountCountOutputType
   */

  export type ExpenseAccountCountOutputType = {
    entries_from: number
    entries_to: number
  }

  export type ExpenseAccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entries_from?: boolean | ExpenseAccountCountOutputTypeCountEntries_fromArgs
    entries_to?: boolean | ExpenseAccountCountOutputTypeCountEntries_toArgs
  }

  // Custom InputTypes
  /**
   * ExpenseAccountCountOutputType without action
   */
  export type ExpenseAccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseAccountCountOutputType
     */
    select?: ExpenseAccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExpenseAccountCountOutputType without action
   */
  export type ExpenseAccountCountOutputTypeCountEntries_fromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseEntryWhereInput
  }

  /**
   * ExpenseAccountCountOutputType without action
   */
  export type ExpenseAccountCountOutputTypeCountEntries_toArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseEntryWhereInput
  }


  /**
   * Count Type ExpenseCategoryCountOutputType
   */

  export type ExpenseCategoryCountOutputType = {
    subcategories: number
    entries: number
  }

  export type ExpenseCategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    subcategories?: boolean | ExpenseCategoryCountOutputTypeCountSubcategoriesArgs
    entries?: boolean | ExpenseCategoryCountOutputTypeCountEntriesArgs
  }

  // Custom InputTypes
  /**
   * ExpenseCategoryCountOutputType without action
   */
  export type ExpenseCategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategoryCountOutputType
     */
    select?: ExpenseCategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExpenseCategoryCountOutputType without action
   */
  export type ExpenseCategoryCountOutputTypeCountSubcategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseSubcategoryWhereInput
  }

  /**
   * ExpenseCategoryCountOutputType without action
   */
  export type ExpenseCategoryCountOutputTypeCountEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseEntryWhereInput
  }


  /**
   * Count Type ExpenseSubcategoryCountOutputType
   */

  export type ExpenseSubcategoryCountOutputType = {
    entries: number
  }

  export type ExpenseSubcategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    entries?: boolean | ExpenseSubcategoryCountOutputTypeCountEntriesArgs
  }

  // Custom InputTypes
  /**
   * ExpenseSubcategoryCountOutputType without action
   */
  export type ExpenseSubcategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseSubcategoryCountOutputType
     */
    select?: ExpenseSubcategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ExpenseSubcategoryCountOutputType without action
   */
  export type ExpenseSubcategoryCountOutputTypeCountEntriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseEntryWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    uuid: string | null
    email: string | null
    phone: string | null
    password: string | null
    first_name: string | null
    last_name: string | null
    role: $Enums.AuthRole | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    uuid: string | null
    email: string | null
    phone: string | null
    password: string | null
    first_name: string | null
    last_name: string | null
    role: $Enums.AuthRole | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    uuid: number
    email: number
    phone: number
    password: number
    first_name: number
    last_name: number
    role: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    uuid?: true
    email?: true
    phone?: true
    password?: true
    first_name?: true
    last_name?: true
    role?: true
    created_at?: true
    updated_at?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    uuid?: true
    email?: true
    phone?: true
    password?: true
    first_name?: true
    last_name?: true
    role?: true
    created_at?: true
    updated_at?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    uuid?: true
    email?: true
    phone?: true
    password?: true
    first_name?: true
    last_name?: true
    role?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    uuid: string
    email: string
    phone: string | null
    password: string
    first_name: string
    last_name: string
    role: $Enums.AuthRole
    created_at: Date
    updated_at: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    first_name?: boolean
    last_name?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
    activities?: boolean | User$activitiesArgs<ExtArgs>
    schedule_slots?: boolean | User$schedule_slotsArgs<ExtArgs>
    expense_accounts?: boolean | User$expense_accountsArgs<ExtArgs>
    expense_entries?: boolean | User$expense_entriesArgs<ExtArgs>
    categories?: boolean | User$categoriesArgs<ExtArgs>
    subcategories?: boolean | User$subcategoriesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    first_name?: boolean
    last_name?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    first_name?: boolean
    last_name?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    uuid?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    first_name?: boolean
    last_name?: boolean
    role?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "uuid" | "email" | "phone" | "password" | "first_name" | "last_name" | "role" | "created_at" | "updated_at", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activities?: boolean | User$activitiesArgs<ExtArgs>
    schedule_slots?: boolean | User$schedule_slotsArgs<ExtArgs>
    expense_accounts?: boolean | User$expense_accountsArgs<ExtArgs>
    expense_entries?: boolean | User$expense_entriesArgs<ExtArgs>
    categories?: boolean | User$categoriesArgs<ExtArgs>
    subcategories?: boolean | User$subcategoriesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      activities: Prisma.$ActivityPayload<ExtArgs>[]
      schedule_slots: Prisma.$ScheduleSlotPayload<ExtArgs>[]
      expense_accounts: Prisma.$ExpenseAccountPayload<ExtArgs>[]
      expense_entries: Prisma.$ExpenseEntryPayload<ExtArgs>[]
      categories: Prisma.$ExpenseCategoryPayload<ExtArgs>[]
      subcategories: Prisma.$ExpenseSubcategoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      uuid: string
      email: string
      phone: string | null
      password: string
      first_name: string
      last_name: string
      role: $Enums.AuthRole
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    activities<T extends User$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, User$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    schedule_slots<T extends User$schedule_slotsArgs<ExtArgs> = {}>(args?: Subset<T, User$schedule_slotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduleSlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    expense_accounts<T extends User$expense_accountsArgs<ExtArgs> = {}>(args?: Subset<T, User$expense_accountsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    expense_entries<T extends User$expense_entriesArgs<ExtArgs> = {}>(args?: Subset<T, User$expense_entriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    categories<T extends User$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, User$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    subcategories<T extends User$subcategoriesArgs<ExtArgs> = {}>(args?: Subset<T, User$subcategoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseSubcategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly uuid: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly first_name: FieldRef<"User", 'String'>
    readonly last_name: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'AuthRole'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.activities
   */
  export type User$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    cursor?: ActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * User.schedule_slots
   */
  export type User$schedule_slotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleSlot
     */
    select?: ScheduleSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleSlot
     */
    omit?: ScheduleSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleSlotInclude<ExtArgs> | null
    where?: ScheduleSlotWhereInput
    orderBy?: ScheduleSlotOrderByWithRelationInput | ScheduleSlotOrderByWithRelationInput[]
    cursor?: ScheduleSlotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduleSlotScalarFieldEnum | ScheduleSlotScalarFieldEnum[]
  }

  /**
   * User.expense_accounts
   */
  export type User$expense_accountsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseAccount
     */
    select?: ExpenseAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseAccount
     */
    omit?: ExpenseAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseAccountInclude<ExtArgs> | null
    where?: ExpenseAccountWhereInput
    orderBy?: ExpenseAccountOrderByWithRelationInput | ExpenseAccountOrderByWithRelationInput[]
    cursor?: ExpenseAccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseAccountScalarFieldEnum | ExpenseAccountScalarFieldEnum[]
  }

  /**
   * User.expense_entries
   */
  export type User$expense_entriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseEntry
     */
    select?: ExpenseEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseEntry
     */
    omit?: ExpenseEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseEntryInclude<ExtArgs> | null
    where?: ExpenseEntryWhereInput
    orderBy?: ExpenseEntryOrderByWithRelationInput | ExpenseEntryOrderByWithRelationInput[]
    cursor?: ExpenseEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseEntryScalarFieldEnum | ExpenseEntryScalarFieldEnum[]
  }

  /**
   * User.categories
   */
  export type User$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    where?: ExpenseCategoryWhereInput
    orderBy?: ExpenseCategoryOrderByWithRelationInput | ExpenseCategoryOrderByWithRelationInput[]
    cursor?: ExpenseCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseCategoryScalarFieldEnum | ExpenseCategoryScalarFieldEnum[]
  }

  /**
   * User.subcategories
   */
  export type User$subcategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseSubcategory
     */
    select?: ExpenseSubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseSubcategory
     */
    omit?: ExpenseSubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseSubcategoryInclude<ExtArgs> | null
    where?: ExpenseSubcategoryWhereInput
    orderBy?: ExpenseSubcategoryOrderByWithRelationInput | ExpenseSubcategoryOrderByWithRelationInput[]
    cursor?: ExpenseSubcategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseSubcategoryScalarFieldEnum | ExpenseSubcategoryScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Activity
   */

  export type AggregateActivity = {
    _count: ActivityCountAggregateOutputType | null
    _avg: ActivityAvgAggregateOutputType | null
    _sum: ActivitySumAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  export type ActivityAvgAggregateOutputType = {
    id: number | null
  }

  export type ActivitySumAggregateOutputType = {
    id: number | null
  }

  export type ActivityMinAggregateOutputType = {
    id: number | null
    uuid: string | null
    user_uuid: string | null
    name: string | null
    color: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ActivityMaxAggregateOutputType = {
    id: number | null
    uuid: string | null
    user_uuid: string | null
    name: string | null
    color: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ActivityCountAggregateOutputType = {
    id: number
    uuid: number
    user_uuid: number
    name: number
    color: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ActivityAvgAggregateInputType = {
    id?: true
  }

  export type ActivitySumAggregateInputType = {
    id?: true
  }

  export type ActivityMinAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    name?: true
    color?: true
    created_at?: true
    updated_at?: true
  }

  export type ActivityMaxAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    name?: true
    color?: true
    created_at?: true
    updated_at?: true
  }

  export type ActivityCountAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    name?: true
    color?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activity to aggregate.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Activities
    **/
    _count?: true | ActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActivityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActivitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityMaxAggregateInputType
  }

  export type GetActivityAggregateType<T extends ActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivity[P]>
      : GetScalarType<T[P], AggregateActivity[P]>
  }




  export type ActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithAggregationInput | ActivityOrderByWithAggregationInput[]
    by: ActivityScalarFieldEnum[] | ActivityScalarFieldEnum
    having?: ActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityCountAggregateInputType | true
    _avg?: ActivityAvgAggregateInputType
    _sum?: ActivitySumAggregateInputType
    _min?: ActivityMinAggregateInputType
    _max?: ActivityMaxAggregateInputType
  }

  export type ActivityGroupByOutputType = {
    id: number
    uuid: string
    user_uuid: string
    name: string
    color: string
    created_at: Date
    updated_at: Date
    _count: ActivityCountAggregateOutputType | null
    _avg: ActivityAvgAggregateOutputType | null
    _sum: ActivitySumAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  type GetActivityGroupByPayload<T extends ActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityGroupByOutputType[P]>
        }
      >
    >


  export type ActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    name?: boolean
    color?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    schedule_slots?: boolean | Activity$schedule_slotsArgs<ExtArgs>
    _count?: boolean | ActivityCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    name?: boolean
    color?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    name?: boolean
    color?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectScalar = {
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    name?: boolean
    color?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ActivityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "uuid" | "user_uuid" | "name" | "color" | "created_at" | "updated_at", ExtArgs["result"]["activity"]>
  export type ActivityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    schedule_slots?: boolean | Activity$schedule_slotsArgs<ExtArgs>
    _count?: boolean | ActivityCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ActivityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ActivityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Activity"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      schedule_slots: Prisma.$ScheduleSlotPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      uuid: string
      user_uuid: string
      name: string
      color: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["activity"]>
    composites: {}
  }

  type ActivityGetPayload<S extends boolean | null | undefined | ActivityDefaultArgs> = $Result.GetResult<Prisma.$ActivityPayload, S>

  type ActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityCountAggregateInputType | true
    }

  export interface ActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Activity'], meta: { name: 'Activity' } }
    /**
     * Find zero or one Activity that matches the filter.
     * @param {ActivityFindUniqueArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityFindUniqueArgs>(args: SelectSubset<T, ActivityFindUniqueArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Activity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityFindUniqueOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityFindFirstArgs>(args?: SelectSubset<T, ActivityFindFirstArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Activities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Activities
     * const activities = await prisma.activity.findMany()
     * 
     * // Get first 10 Activities
     * const activities = await prisma.activity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityWithIdOnly = await prisma.activity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityFindManyArgs>(args?: SelectSubset<T, ActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Activity.
     * @param {ActivityCreateArgs} args - Arguments to create a Activity.
     * @example
     * // Create one Activity
     * const Activity = await prisma.activity.create({
     *   data: {
     *     // ... data to create a Activity
     *   }
     * })
     * 
     */
    create<T extends ActivityCreateArgs>(args: SelectSubset<T, ActivityCreateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Activities.
     * @param {ActivityCreateManyArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityCreateManyArgs>(args?: SelectSubset<T, ActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Activities and returns the data saved in the database.
     * @param {ActivityCreateManyAndReturnArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Activity.
     * @param {ActivityDeleteArgs} args - Arguments to delete one Activity.
     * @example
     * // Delete one Activity
     * const Activity = await prisma.activity.delete({
     *   where: {
     *     // ... filter to delete one Activity
     *   }
     * })
     * 
     */
    delete<T extends ActivityDeleteArgs>(args: SelectSubset<T, ActivityDeleteArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Activity.
     * @param {ActivityUpdateArgs} args - Arguments to update one Activity.
     * @example
     * // Update one Activity
     * const activity = await prisma.activity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityUpdateArgs>(args: SelectSubset<T, ActivityUpdateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Activities.
     * @param {ActivityDeleteManyArgs} args - Arguments to filter Activities to delete.
     * @example
     * // Delete a few Activities
     * const { count } = await prisma.activity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityDeleteManyArgs>(args?: SelectSubset<T, ActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityUpdateManyArgs>(args: SelectSubset<T, ActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities and returns the data updated in the database.
     * @param {ActivityUpdateManyAndReturnArgs} args - Arguments to update many Activities.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActivityUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Activity.
     * @param {ActivityUpsertArgs} args - Arguments to update or create a Activity.
     * @example
     * // Update or create a Activity
     * const activity = await prisma.activity.upsert({
     *   create: {
     *     // ... data to create a Activity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Activity we want to update
     *   }
     * })
     */
    upsert<T extends ActivityUpsertArgs>(args: SelectSubset<T, ActivityUpsertArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCountArgs} args - Arguments to filter Activities to count.
     * @example
     * // Count the number of Activities
     * const count = await prisma.activity.count({
     *   where: {
     *     // ... the filter for the Activities we want to count
     *   }
     * })
    **/
    count<T extends ActivityCountArgs>(
      args?: Subset<T, ActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityAggregateArgs>(args: Subset<T, ActivityAggregateArgs>): Prisma.PrismaPromise<GetActivityAggregateType<T>>

    /**
     * Group by Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityGroupByArgs['orderBy'] }
        : { orderBy?: ActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Activity model
   */
  readonly fields: ActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Activity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    schedule_slots<T extends Activity$schedule_slotsArgs<ExtArgs> = {}>(args?: Subset<T, Activity$schedule_slotsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduleSlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Activity model
   */
  interface ActivityFieldRefs {
    readonly id: FieldRef<"Activity", 'Int'>
    readonly uuid: FieldRef<"Activity", 'String'>
    readonly user_uuid: FieldRef<"Activity", 'String'>
    readonly name: FieldRef<"Activity", 'String'>
    readonly color: FieldRef<"Activity", 'String'>
    readonly created_at: FieldRef<"Activity", 'DateTime'>
    readonly updated_at: FieldRef<"Activity", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Activity findUnique
   */
  export type ActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findUniqueOrThrow
   */
  export type ActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findFirst
   */
  export type ActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findFirstOrThrow
   */
  export type ActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findMany
   */
  export type ActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activities to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity create
   */
  export type ActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to create a Activity.
     */
    data: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
  }

  /**
   * Activity createMany
   */
  export type ActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Activity createManyAndReturn
   */
  export type ActivityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Activity update
   */
  export type ActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to update a Activity.
     */
    data: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
    /**
     * Choose, which Activity to update.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity updateMany
   */
  export type ActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
  }

  /**
   * Activity updateManyAndReturn
   */
  export type ActivityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Activity upsert
   */
  export type ActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The filter to search for the Activity to update in case it exists.
     */
    where: ActivityWhereUniqueInput
    /**
     * In case the Activity found by the `where` argument doesn't exist, create a new Activity with this data.
     */
    create: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
    /**
     * In case the Activity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
  }

  /**
   * Activity delete
   */
  export type ActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter which Activity to delete.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity deleteMany
   */
  export type ActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activities to delete
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to delete.
     */
    limit?: number
  }

  /**
   * Activity.schedule_slots
   */
  export type Activity$schedule_slotsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleSlot
     */
    select?: ScheduleSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleSlot
     */
    omit?: ScheduleSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleSlotInclude<ExtArgs> | null
    where?: ScheduleSlotWhereInput
    orderBy?: ScheduleSlotOrderByWithRelationInput | ScheduleSlotOrderByWithRelationInput[]
    cursor?: ScheduleSlotWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ScheduleSlotScalarFieldEnum | ScheduleSlotScalarFieldEnum[]
  }

  /**
   * Activity without action
   */
  export type ActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
  }


  /**
   * Model ScheduleSlot
   */

  export type AggregateScheduleSlot = {
    _count: ScheduleSlotCountAggregateOutputType | null
    _avg: ScheduleSlotAvgAggregateOutputType | null
    _sum: ScheduleSlotSumAggregateOutputType | null
    _min: ScheduleSlotMinAggregateOutputType | null
    _max: ScheduleSlotMaxAggregateOutputType | null
  }

  export type ScheduleSlotAvgAggregateOutputType = {
    id: number | null
  }

  export type ScheduleSlotSumAggregateOutputType = {
    id: number | null
  }

  export type ScheduleSlotMinAggregateOutputType = {
    id: number | null
    uuid: string | null
    user_uuid: string | null
    activity_uuid: string | null
    day: $Enums.ScheduleDay | null
    start_time: string | null
    end_time: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ScheduleSlotMaxAggregateOutputType = {
    id: number | null
    uuid: string | null
    user_uuid: string | null
    activity_uuid: string | null
    day: $Enums.ScheduleDay | null
    start_time: string | null
    end_time: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ScheduleSlotCountAggregateOutputType = {
    id: number
    uuid: number
    user_uuid: number
    activity_uuid: number
    day: number
    start_time: number
    end_time: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ScheduleSlotAvgAggregateInputType = {
    id?: true
  }

  export type ScheduleSlotSumAggregateInputType = {
    id?: true
  }

  export type ScheduleSlotMinAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    activity_uuid?: true
    day?: true
    start_time?: true
    end_time?: true
    created_at?: true
    updated_at?: true
  }

  export type ScheduleSlotMaxAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    activity_uuid?: true
    day?: true
    start_time?: true
    end_time?: true
    created_at?: true
    updated_at?: true
  }

  export type ScheduleSlotCountAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    activity_uuid?: true
    day?: true
    start_time?: true
    end_time?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ScheduleSlotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScheduleSlot to aggregate.
     */
    where?: ScheduleSlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScheduleSlots to fetch.
     */
    orderBy?: ScheduleSlotOrderByWithRelationInput | ScheduleSlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ScheduleSlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScheduleSlots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScheduleSlots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ScheduleSlots
    **/
    _count?: true | ScheduleSlotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ScheduleSlotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ScheduleSlotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ScheduleSlotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ScheduleSlotMaxAggregateInputType
  }

  export type GetScheduleSlotAggregateType<T extends ScheduleSlotAggregateArgs> = {
        [P in keyof T & keyof AggregateScheduleSlot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateScheduleSlot[P]>
      : GetScalarType<T[P], AggregateScheduleSlot[P]>
  }




  export type ScheduleSlotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ScheduleSlotWhereInput
    orderBy?: ScheduleSlotOrderByWithAggregationInput | ScheduleSlotOrderByWithAggregationInput[]
    by: ScheduleSlotScalarFieldEnum[] | ScheduleSlotScalarFieldEnum
    having?: ScheduleSlotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ScheduleSlotCountAggregateInputType | true
    _avg?: ScheduleSlotAvgAggregateInputType
    _sum?: ScheduleSlotSumAggregateInputType
    _min?: ScheduleSlotMinAggregateInputType
    _max?: ScheduleSlotMaxAggregateInputType
  }

  export type ScheduleSlotGroupByOutputType = {
    id: number
    uuid: string
    user_uuid: string
    activity_uuid: string
    day: $Enums.ScheduleDay
    start_time: string
    end_time: string
    created_at: Date
    updated_at: Date
    _count: ScheduleSlotCountAggregateOutputType | null
    _avg: ScheduleSlotAvgAggregateOutputType | null
    _sum: ScheduleSlotSumAggregateOutputType | null
    _min: ScheduleSlotMinAggregateOutputType | null
    _max: ScheduleSlotMaxAggregateOutputType | null
  }

  type GetScheduleSlotGroupByPayload<T extends ScheduleSlotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ScheduleSlotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ScheduleSlotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ScheduleSlotGroupByOutputType[P]>
            : GetScalarType<T[P], ScheduleSlotGroupByOutputType[P]>
        }
      >
    >


  export type ScheduleSlotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    activity_uuid?: boolean
    day?: boolean
    start_time?: boolean
    end_time?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    activity?: boolean | ActivityDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scheduleSlot"]>

  export type ScheduleSlotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    activity_uuid?: boolean
    day?: boolean
    start_time?: boolean
    end_time?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    activity?: boolean | ActivityDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scheduleSlot"]>

  export type ScheduleSlotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    activity_uuid?: boolean
    day?: boolean
    start_time?: boolean
    end_time?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    activity?: boolean | ActivityDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["scheduleSlot"]>

  export type ScheduleSlotSelectScalar = {
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    activity_uuid?: boolean
    day?: boolean
    start_time?: boolean
    end_time?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ScheduleSlotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "uuid" | "user_uuid" | "activity_uuid" | "day" | "start_time" | "end_time" | "created_at" | "updated_at", ExtArgs["result"]["scheduleSlot"]>
  export type ScheduleSlotInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    activity?: boolean | ActivityDefaultArgs<ExtArgs>
  }
  export type ScheduleSlotIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    activity?: boolean | ActivityDefaultArgs<ExtArgs>
  }
  export type ScheduleSlotIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    activity?: boolean | ActivityDefaultArgs<ExtArgs>
  }

  export type $ScheduleSlotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ScheduleSlot"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      activity: Prisma.$ActivityPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      uuid: string
      user_uuid: string
      activity_uuid: string
      day: $Enums.ScheduleDay
      start_time: string
      end_time: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["scheduleSlot"]>
    composites: {}
  }

  type ScheduleSlotGetPayload<S extends boolean | null | undefined | ScheduleSlotDefaultArgs> = $Result.GetResult<Prisma.$ScheduleSlotPayload, S>

  type ScheduleSlotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ScheduleSlotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ScheduleSlotCountAggregateInputType | true
    }

  export interface ScheduleSlotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ScheduleSlot'], meta: { name: 'ScheduleSlot' } }
    /**
     * Find zero or one ScheduleSlot that matches the filter.
     * @param {ScheduleSlotFindUniqueArgs} args - Arguments to find a ScheduleSlot
     * @example
     * // Get one ScheduleSlot
     * const scheduleSlot = await prisma.scheduleSlot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ScheduleSlotFindUniqueArgs>(args: SelectSubset<T, ScheduleSlotFindUniqueArgs<ExtArgs>>): Prisma__ScheduleSlotClient<$Result.GetResult<Prisma.$ScheduleSlotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ScheduleSlot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ScheduleSlotFindUniqueOrThrowArgs} args - Arguments to find a ScheduleSlot
     * @example
     * // Get one ScheduleSlot
     * const scheduleSlot = await prisma.scheduleSlot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ScheduleSlotFindUniqueOrThrowArgs>(args: SelectSubset<T, ScheduleSlotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ScheduleSlotClient<$Result.GetResult<Prisma.$ScheduleSlotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ScheduleSlot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleSlotFindFirstArgs} args - Arguments to find a ScheduleSlot
     * @example
     * // Get one ScheduleSlot
     * const scheduleSlot = await prisma.scheduleSlot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ScheduleSlotFindFirstArgs>(args?: SelectSubset<T, ScheduleSlotFindFirstArgs<ExtArgs>>): Prisma__ScheduleSlotClient<$Result.GetResult<Prisma.$ScheduleSlotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ScheduleSlot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleSlotFindFirstOrThrowArgs} args - Arguments to find a ScheduleSlot
     * @example
     * // Get one ScheduleSlot
     * const scheduleSlot = await prisma.scheduleSlot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ScheduleSlotFindFirstOrThrowArgs>(args?: SelectSubset<T, ScheduleSlotFindFirstOrThrowArgs<ExtArgs>>): Prisma__ScheduleSlotClient<$Result.GetResult<Prisma.$ScheduleSlotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ScheduleSlots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleSlotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ScheduleSlots
     * const scheduleSlots = await prisma.scheduleSlot.findMany()
     * 
     * // Get first 10 ScheduleSlots
     * const scheduleSlots = await prisma.scheduleSlot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const scheduleSlotWithIdOnly = await prisma.scheduleSlot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ScheduleSlotFindManyArgs>(args?: SelectSubset<T, ScheduleSlotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduleSlotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ScheduleSlot.
     * @param {ScheduleSlotCreateArgs} args - Arguments to create a ScheduleSlot.
     * @example
     * // Create one ScheduleSlot
     * const ScheduleSlot = await prisma.scheduleSlot.create({
     *   data: {
     *     // ... data to create a ScheduleSlot
     *   }
     * })
     * 
     */
    create<T extends ScheduleSlotCreateArgs>(args: SelectSubset<T, ScheduleSlotCreateArgs<ExtArgs>>): Prisma__ScheduleSlotClient<$Result.GetResult<Prisma.$ScheduleSlotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ScheduleSlots.
     * @param {ScheduleSlotCreateManyArgs} args - Arguments to create many ScheduleSlots.
     * @example
     * // Create many ScheduleSlots
     * const scheduleSlot = await prisma.scheduleSlot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ScheduleSlotCreateManyArgs>(args?: SelectSubset<T, ScheduleSlotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ScheduleSlots and returns the data saved in the database.
     * @param {ScheduleSlotCreateManyAndReturnArgs} args - Arguments to create many ScheduleSlots.
     * @example
     * // Create many ScheduleSlots
     * const scheduleSlot = await prisma.scheduleSlot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ScheduleSlots and only return the `id`
     * const scheduleSlotWithIdOnly = await prisma.scheduleSlot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ScheduleSlotCreateManyAndReturnArgs>(args?: SelectSubset<T, ScheduleSlotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduleSlotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ScheduleSlot.
     * @param {ScheduleSlotDeleteArgs} args - Arguments to delete one ScheduleSlot.
     * @example
     * // Delete one ScheduleSlot
     * const ScheduleSlot = await prisma.scheduleSlot.delete({
     *   where: {
     *     // ... filter to delete one ScheduleSlot
     *   }
     * })
     * 
     */
    delete<T extends ScheduleSlotDeleteArgs>(args: SelectSubset<T, ScheduleSlotDeleteArgs<ExtArgs>>): Prisma__ScheduleSlotClient<$Result.GetResult<Prisma.$ScheduleSlotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ScheduleSlot.
     * @param {ScheduleSlotUpdateArgs} args - Arguments to update one ScheduleSlot.
     * @example
     * // Update one ScheduleSlot
     * const scheduleSlot = await prisma.scheduleSlot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ScheduleSlotUpdateArgs>(args: SelectSubset<T, ScheduleSlotUpdateArgs<ExtArgs>>): Prisma__ScheduleSlotClient<$Result.GetResult<Prisma.$ScheduleSlotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ScheduleSlots.
     * @param {ScheduleSlotDeleteManyArgs} args - Arguments to filter ScheduleSlots to delete.
     * @example
     * // Delete a few ScheduleSlots
     * const { count } = await prisma.scheduleSlot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ScheduleSlotDeleteManyArgs>(args?: SelectSubset<T, ScheduleSlotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScheduleSlots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleSlotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ScheduleSlots
     * const scheduleSlot = await prisma.scheduleSlot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ScheduleSlotUpdateManyArgs>(args: SelectSubset<T, ScheduleSlotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ScheduleSlots and returns the data updated in the database.
     * @param {ScheduleSlotUpdateManyAndReturnArgs} args - Arguments to update many ScheduleSlots.
     * @example
     * // Update many ScheduleSlots
     * const scheduleSlot = await prisma.scheduleSlot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ScheduleSlots and only return the `id`
     * const scheduleSlotWithIdOnly = await prisma.scheduleSlot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ScheduleSlotUpdateManyAndReturnArgs>(args: SelectSubset<T, ScheduleSlotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ScheduleSlotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ScheduleSlot.
     * @param {ScheduleSlotUpsertArgs} args - Arguments to update or create a ScheduleSlot.
     * @example
     * // Update or create a ScheduleSlot
     * const scheduleSlot = await prisma.scheduleSlot.upsert({
     *   create: {
     *     // ... data to create a ScheduleSlot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ScheduleSlot we want to update
     *   }
     * })
     */
    upsert<T extends ScheduleSlotUpsertArgs>(args: SelectSubset<T, ScheduleSlotUpsertArgs<ExtArgs>>): Prisma__ScheduleSlotClient<$Result.GetResult<Prisma.$ScheduleSlotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ScheduleSlots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleSlotCountArgs} args - Arguments to filter ScheduleSlots to count.
     * @example
     * // Count the number of ScheduleSlots
     * const count = await prisma.scheduleSlot.count({
     *   where: {
     *     // ... the filter for the ScheduleSlots we want to count
     *   }
     * })
    **/
    count<T extends ScheduleSlotCountArgs>(
      args?: Subset<T, ScheduleSlotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ScheduleSlotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ScheduleSlot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleSlotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ScheduleSlotAggregateArgs>(args: Subset<T, ScheduleSlotAggregateArgs>): Prisma.PrismaPromise<GetScheduleSlotAggregateType<T>>

    /**
     * Group by ScheduleSlot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ScheduleSlotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ScheduleSlotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ScheduleSlotGroupByArgs['orderBy'] }
        : { orderBy?: ScheduleSlotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ScheduleSlotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetScheduleSlotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ScheduleSlot model
   */
  readonly fields: ScheduleSlotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ScheduleSlot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ScheduleSlotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    activity<T extends ActivityDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ActivityDefaultArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ScheduleSlot model
   */
  interface ScheduleSlotFieldRefs {
    readonly id: FieldRef<"ScheduleSlot", 'Int'>
    readonly uuid: FieldRef<"ScheduleSlot", 'String'>
    readonly user_uuid: FieldRef<"ScheduleSlot", 'String'>
    readonly activity_uuid: FieldRef<"ScheduleSlot", 'String'>
    readonly day: FieldRef<"ScheduleSlot", 'ScheduleDay'>
    readonly start_time: FieldRef<"ScheduleSlot", 'String'>
    readonly end_time: FieldRef<"ScheduleSlot", 'String'>
    readonly created_at: FieldRef<"ScheduleSlot", 'DateTime'>
    readonly updated_at: FieldRef<"ScheduleSlot", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ScheduleSlot findUnique
   */
  export type ScheduleSlotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleSlot
     */
    select?: ScheduleSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleSlot
     */
    omit?: ScheduleSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleSlotInclude<ExtArgs> | null
    /**
     * Filter, which ScheduleSlot to fetch.
     */
    where: ScheduleSlotWhereUniqueInput
  }

  /**
   * ScheduleSlot findUniqueOrThrow
   */
  export type ScheduleSlotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleSlot
     */
    select?: ScheduleSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleSlot
     */
    omit?: ScheduleSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleSlotInclude<ExtArgs> | null
    /**
     * Filter, which ScheduleSlot to fetch.
     */
    where: ScheduleSlotWhereUniqueInput
  }

  /**
   * ScheduleSlot findFirst
   */
  export type ScheduleSlotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleSlot
     */
    select?: ScheduleSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleSlot
     */
    omit?: ScheduleSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleSlotInclude<ExtArgs> | null
    /**
     * Filter, which ScheduleSlot to fetch.
     */
    where?: ScheduleSlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScheduleSlots to fetch.
     */
    orderBy?: ScheduleSlotOrderByWithRelationInput | ScheduleSlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScheduleSlots.
     */
    cursor?: ScheduleSlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScheduleSlots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScheduleSlots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScheduleSlots.
     */
    distinct?: ScheduleSlotScalarFieldEnum | ScheduleSlotScalarFieldEnum[]
  }

  /**
   * ScheduleSlot findFirstOrThrow
   */
  export type ScheduleSlotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleSlot
     */
    select?: ScheduleSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleSlot
     */
    omit?: ScheduleSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleSlotInclude<ExtArgs> | null
    /**
     * Filter, which ScheduleSlot to fetch.
     */
    where?: ScheduleSlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScheduleSlots to fetch.
     */
    orderBy?: ScheduleSlotOrderByWithRelationInput | ScheduleSlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ScheduleSlots.
     */
    cursor?: ScheduleSlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScheduleSlots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScheduleSlots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ScheduleSlots.
     */
    distinct?: ScheduleSlotScalarFieldEnum | ScheduleSlotScalarFieldEnum[]
  }

  /**
   * ScheduleSlot findMany
   */
  export type ScheduleSlotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleSlot
     */
    select?: ScheduleSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleSlot
     */
    omit?: ScheduleSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleSlotInclude<ExtArgs> | null
    /**
     * Filter, which ScheduleSlots to fetch.
     */
    where?: ScheduleSlotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ScheduleSlots to fetch.
     */
    orderBy?: ScheduleSlotOrderByWithRelationInput | ScheduleSlotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ScheduleSlots.
     */
    cursor?: ScheduleSlotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ScheduleSlots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ScheduleSlots.
     */
    skip?: number
    distinct?: ScheduleSlotScalarFieldEnum | ScheduleSlotScalarFieldEnum[]
  }

  /**
   * ScheduleSlot create
   */
  export type ScheduleSlotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleSlot
     */
    select?: ScheduleSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleSlot
     */
    omit?: ScheduleSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleSlotInclude<ExtArgs> | null
    /**
     * The data needed to create a ScheduleSlot.
     */
    data: XOR<ScheduleSlotCreateInput, ScheduleSlotUncheckedCreateInput>
  }

  /**
   * ScheduleSlot createMany
   */
  export type ScheduleSlotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ScheduleSlots.
     */
    data: ScheduleSlotCreateManyInput | ScheduleSlotCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ScheduleSlot createManyAndReturn
   */
  export type ScheduleSlotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleSlot
     */
    select?: ScheduleSlotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleSlot
     */
    omit?: ScheduleSlotOmit<ExtArgs> | null
    /**
     * The data used to create many ScheduleSlots.
     */
    data: ScheduleSlotCreateManyInput | ScheduleSlotCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleSlotIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ScheduleSlot update
   */
  export type ScheduleSlotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleSlot
     */
    select?: ScheduleSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleSlot
     */
    omit?: ScheduleSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleSlotInclude<ExtArgs> | null
    /**
     * The data needed to update a ScheduleSlot.
     */
    data: XOR<ScheduleSlotUpdateInput, ScheduleSlotUncheckedUpdateInput>
    /**
     * Choose, which ScheduleSlot to update.
     */
    where: ScheduleSlotWhereUniqueInput
  }

  /**
   * ScheduleSlot updateMany
   */
  export type ScheduleSlotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ScheduleSlots.
     */
    data: XOR<ScheduleSlotUpdateManyMutationInput, ScheduleSlotUncheckedUpdateManyInput>
    /**
     * Filter which ScheduleSlots to update
     */
    where?: ScheduleSlotWhereInput
    /**
     * Limit how many ScheduleSlots to update.
     */
    limit?: number
  }

  /**
   * ScheduleSlot updateManyAndReturn
   */
  export type ScheduleSlotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleSlot
     */
    select?: ScheduleSlotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleSlot
     */
    omit?: ScheduleSlotOmit<ExtArgs> | null
    /**
     * The data used to update ScheduleSlots.
     */
    data: XOR<ScheduleSlotUpdateManyMutationInput, ScheduleSlotUncheckedUpdateManyInput>
    /**
     * Filter which ScheduleSlots to update
     */
    where?: ScheduleSlotWhereInput
    /**
     * Limit how many ScheduleSlots to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleSlotIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ScheduleSlot upsert
   */
  export type ScheduleSlotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleSlot
     */
    select?: ScheduleSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleSlot
     */
    omit?: ScheduleSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleSlotInclude<ExtArgs> | null
    /**
     * The filter to search for the ScheduleSlot to update in case it exists.
     */
    where: ScheduleSlotWhereUniqueInput
    /**
     * In case the ScheduleSlot found by the `where` argument doesn't exist, create a new ScheduleSlot with this data.
     */
    create: XOR<ScheduleSlotCreateInput, ScheduleSlotUncheckedCreateInput>
    /**
     * In case the ScheduleSlot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ScheduleSlotUpdateInput, ScheduleSlotUncheckedUpdateInput>
  }

  /**
   * ScheduleSlot delete
   */
  export type ScheduleSlotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleSlot
     */
    select?: ScheduleSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleSlot
     */
    omit?: ScheduleSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleSlotInclude<ExtArgs> | null
    /**
     * Filter which ScheduleSlot to delete.
     */
    where: ScheduleSlotWhereUniqueInput
  }

  /**
   * ScheduleSlot deleteMany
   */
  export type ScheduleSlotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ScheduleSlots to delete
     */
    where?: ScheduleSlotWhereInput
    /**
     * Limit how many ScheduleSlots to delete.
     */
    limit?: number
  }

  /**
   * ScheduleSlot without action
   */
  export type ScheduleSlotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ScheduleSlot
     */
    select?: ScheduleSlotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ScheduleSlot
     */
    omit?: ScheduleSlotOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ScheduleSlotInclude<ExtArgs> | null
  }


  /**
   * Model ExpenseAccount
   */

  export type AggregateExpenseAccount = {
    _count: ExpenseAccountCountAggregateOutputType | null
    _avg: ExpenseAccountAvgAggregateOutputType | null
    _sum: ExpenseAccountSumAggregateOutputType | null
    _min: ExpenseAccountMinAggregateOutputType | null
    _max: ExpenseAccountMaxAggregateOutputType | null
  }

  export type ExpenseAccountAvgAggregateOutputType = {
    id: number | null
    balance: Decimal | null
  }

  export type ExpenseAccountSumAggregateOutputType = {
    id: number | null
    balance: Decimal | null
  }

  export type ExpenseAccountMinAggregateOutputType = {
    id: number | null
    uuid: string | null
    user_uuid: string | null
    name: string | null
    icon: string | null
    color: string | null
    balance: Decimal | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ExpenseAccountMaxAggregateOutputType = {
    id: number | null
    uuid: string | null
    user_uuid: string | null
    name: string | null
    icon: string | null
    color: string | null
    balance: Decimal | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ExpenseAccountCountAggregateOutputType = {
    id: number
    uuid: number
    user_uuid: number
    name: number
    icon: number
    color: number
    balance: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ExpenseAccountAvgAggregateInputType = {
    id?: true
    balance?: true
  }

  export type ExpenseAccountSumAggregateInputType = {
    id?: true
    balance?: true
  }

  export type ExpenseAccountMinAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    name?: true
    icon?: true
    color?: true
    balance?: true
    created_at?: true
    updated_at?: true
  }

  export type ExpenseAccountMaxAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    name?: true
    icon?: true
    color?: true
    balance?: true
    created_at?: true
    updated_at?: true
  }

  export type ExpenseAccountCountAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    name?: true
    icon?: true
    color?: true
    balance?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ExpenseAccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExpenseAccount to aggregate.
     */
    where?: ExpenseAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseAccounts to fetch.
     */
    orderBy?: ExpenseAccountOrderByWithRelationInput | ExpenseAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExpenseAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExpenseAccounts
    **/
    _count?: true | ExpenseAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExpenseAccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExpenseAccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpenseAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpenseAccountMaxAggregateInputType
  }

  export type GetExpenseAccountAggregateType<T extends ExpenseAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateExpenseAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExpenseAccount[P]>
      : GetScalarType<T[P], AggregateExpenseAccount[P]>
  }




  export type ExpenseAccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseAccountWhereInput
    orderBy?: ExpenseAccountOrderByWithAggregationInput | ExpenseAccountOrderByWithAggregationInput[]
    by: ExpenseAccountScalarFieldEnum[] | ExpenseAccountScalarFieldEnum
    having?: ExpenseAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpenseAccountCountAggregateInputType | true
    _avg?: ExpenseAccountAvgAggregateInputType
    _sum?: ExpenseAccountSumAggregateInputType
    _min?: ExpenseAccountMinAggregateInputType
    _max?: ExpenseAccountMaxAggregateInputType
  }

  export type ExpenseAccountGroupByOutputType = {
    id: number
    uuid: string
    user_uuid: string
    name: string
    icon: string | null
    color: string | null
    balance: Decimal
    created_at: Date
    updated_at: Date
    _count: ExpenseAccountCountAggregateOutputType | null
    _avg: ExpenseAccountAvgAggregateOutputType | null
    _sum: ExpenseAccountSumAggregateOutputType | null
    _min: ExpenseAccountMinAggregateOutputType | null
    _max: ExpenseAccountMaxAggregateOutputType | null
  }

  type GetExpenseAccountGroupByPayload<T extends ExpenseAccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExpenseAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExpenseAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExpenseAccountGroupByOutputType[P]>
            : GetScalarType<T[P], ExpenseAccountGroupByOutputType[P]>
        }
      >
    >


  export type ExpenseAccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    name?: boolean
    icon?: boolean
    color?: boolean
    balance?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    entries_from?: boolean | ExpenseAccount$entries_fromArgs<ExtArgs>
    entries_to?: boolean | ExpenseAccount$entries_toArgs<ExtArgs>
    _count?: boolean | ExpenseAccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expenseAccount"]>

  export type ExpenseAccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    name?: boolean
    icon?: boolean
    color?: boolean
    balance?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expenseAccount"]>

  export type ExpenseAccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    name?: boolean
    icon?: boolean
    color?: boolean
    balance?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expenseAccount"]>

  export type ExpenseAccountSelectScalar = {
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    name?: boolean
    icon?: boolean
    color?: boolean
    balance?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ExpenseAccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "uuid" | "user_uuid" | "name" | "icon" | "color" | "balance" | "created_at" | "updated_at", ExtArgs["result"]["expenseAccount"]>
  export type ExpenseAccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    entries_from?: boolean | ExpenseAccount$entries_fromArgs<ExtArgs>
    entries_to?: boolean | ExpenseAccount$entries_toArgs<ExtArgs>
    _count?: boolean | ExpenseAccountCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ExpenseAccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ExpenseAccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ExpenseAccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExpenseAccount"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      entries_from: Prisma.$ExpenseEntryPayload<ExtArgs>[]
      entries_to: Prisma.$ExpenseEntryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      uuid: string
      user_uuid: string
      name: string
      icon: string | null
      color: string | null
      balance: Prisma.Decimal
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["expenseAccount"]>
    composites: {}
  }

  type ExpenseAccountGetPayload<S extends boolean | null | undefined | ExpenseAccountDefaultArgs> = $Result.GetResult<Prisma.$ExpenseAccountPayload, S>

  type ExpenseAccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExpenseAccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExpenseAccountCountAggregateInputType | true
    }

  export interface ExpenseAccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExpenseAccount'], meta: { name: 'ExpenseAccount' } }
    /**
     * Find zero or one ExpenseAccount that matches the filter.
     * @param {ExpenseAccountFindUniqueArgs} args - Arguments to find a ExpenseAccount
     * @example
     * // Get one ExpenseAccount
     * const expenseAccount = await prisma.expenseAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExpenseAccountFindUniqueArgs>(args: SelectSubset<T, ExpenseAccountFindUniqueArgs<ExtArgs>>): Prisma__ExpenseAccountClient<$Result.GetResult<Prisma.$ExpenseAccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExpenseAccount that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExpenseAccountFindUniqueOrThrowArgs} args - Arguments to find a ExpenseAccount
     * @example
     * // Get one ExpenseAccount
     * const expenseAccount = await prisma.expenseAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExpenseAccountFindUniqueOrThrowArgs>(args: SelectSubset<T, ExpenseAccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExpenseAccountClient<$Result.GetResult<Prisma.$ExpenseAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExpenseAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseAccountFindFirstArgs} args - Arguments to find a ExpenseAccount
     * @example
     * // Get one ExpenseAccount
     * const expenseAccount = await prisma.expenseAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExpenseAccountFindFirstArgs>(args?: SelectSubset<T, ExpenseAccountFindFirstArgs<ExtArgs>>): Prisma__ExpenseAccountClient<$Result.GetResult<Prisma.$ExpenseAccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExpenseAccount that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseAccountFindFirstOrThrowArgs} args - Arguments to find a ExpenseAccount
     * @example
     * // Get one ExpenseAccount
     * const expenseAccount = await prisma.expenseAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExpenseAccountFindFirstOrThrowArgs>(args?: SelectSubset<T, ExpenseAccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExpenseAccountClient<$Result.GetResult<Prisma.$ExpenseAccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExpenseAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseAccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExpenseAccounts
     * const expenseAccounts = await prisma.expenseAccount.findMany()
     * 
     * // Get first 10 ExpenseAccounts
     * const expenseAccounts = await prisma.expenseAccount.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const expenseAccountWithIdOnly = await prisma.expenseAccount.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExpenseAccountFindManyArgs>(args?: SelectSubset<T, ExpenseAccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseAccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExpenseAccount.
     * @param {ExpenseAccountCreateArgs} args - Arguments to create a ExpenseAccount.
     * @example
     * // Create one ExpenseAccount
     * const ExpenseAccount = await prisma.expenseAccount.create({
     *   data: {
     *     // ... data to create a ExpenseAccount
     *   }
     * })
     * 
     */
    create<T extends ExpenseAccountCreateArgs>(args: SelectSubset<T, ExpenseAccountCreateArgs<ExtArgs>>): Prisma__ExpenseAccountClient<$Result.GetResult<Prisma.$ExpenseAccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExpenseAccounts.
     * @param {ExpenseAccountCreateManyArgs} args - Arguments to create many ExpenseAccounts.
     * @example
     * // Create many ExpenseAccounts
     * const expenseAccount = await prisma.expenseAccount.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExpenseAccountCreateManyArgs>(args?: SelectSubset<T, ExpenseAccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExpenseAccounts and returns the data saved in the database.
     * @param {ExpenseAccountCreateManyAndReturnArgs} args - Arguments to create many ExpenseAccounts.
     * @example
     * // Create many ExpenseAccounts
     * const expenseAccount = await prisma.expenseAccount.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExpenseAccounts and only return the `id`
     * const expenseAccountWithIdOnly = await prisma.expenseAccount.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExpenseAccountCreateManyAndReturnArgs>(args?: SelectSubset<T, ExpenseAccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseAccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExpenseAccount.
     * @param {ExpenseAccountDeleteArgs} args - Arguments to delete one ExpenseAccount.
     * @example
     * // Delete one ExpenseAccount
     * const ExpenseAccount = await prisma.expenseAccount.delete({
     *   where: {
     *     // ... filter to delete one ExpenseAccount
     *   }
     * })
     * 
     */
    delete<T extends ExpenseAccountDeleteArgs>(args: SelectSubset<T, ExpenseAccountDeleteArgs<ExtArgs>>): Prisma__ExpenseAccountClient<$Result.GetResult<Prisma.$ExpenseAccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExpenseAccount.
     * @param {ExpenseAccountUpdateArgs} args - Arguments to update one ExpenseAccount.
     * @example
     * // Update one ExpenseAccount
     * const expenseAccount = await prisma.expenseAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExpenseAccountUpdateArgs>(args: SelectSubset<T, ExpenseAccountUpdateArgs<ExtArgs>>): Prisma__ExpenseAccountClient<$Result.GetResult<Prisma.$ExpenseAccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExpenseAccounts.
     * @param {ExpenseAccountDeleteManyArgs} args - Arguments to filter ExpenseAccounts to delete.
     * @example
     * // Delete a few ExpenseAccounts
     * const { count } = await prisma.expenseAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExpenseAccountDeleteManyArgs>(args?: SelectSubset<T, ExpenseAccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExpenseAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExpenseAccounts
     * const expenseAccount = await prisma.expenseAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExpenseAccountUpdateManyArgs>(args: SelectSubset<T, ExpenseAccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExpenseAccounts and returns the data updated in the database.
     * @param {ExpenseAccountUpdateManyAndReturnArgs} args - Arguments to update many ExpenseAccounts.
     * @example
     * // Update many ExpenseAccounts
     * const expenseAccount = await prisma.expenseAccount.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExpenseAccounts and only return the `id`
     * const expenseAccountWithIdOnly = await prisma.expenseAccount.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExpenseAccountUpdateManyAndReturnArgs>(args: SelectSubset<T, ExpenseAccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseAccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExpenseAccount.
     * @param {ExpenseAccountUpsertArgs} args - Arguments to update or create a ExpenseAccount.
     * @example
     * // Update or create a ExpenseAccount
     * const expenseAccount = await prisma.expenseAccount.upsert({
     *   create: {
     *     // ... data to create a ExpenseAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExpenseAccount we want to update
     *   }
     * })
     */
    upsert<T extends ExpenseAccountUpsertArgs>(args: SelectSubset<T, ExpenseAccountUpsertArgs<ExtArgs>>): Prisma__ExpenseAccountClient<$Result.GetResult<Prisma.$ExpenseAccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExpenseAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseAccountCountArgs} args - Arguments to filter ExpenseAccounts to count.
     * @example
     * // Count the number of ExpenseAccounts
     * const count = await prisma.expenseAccount.count({
     *   where: {
     *     // ... the filter for the ExpenseAccounts we want to count
     *   }
     * })
    **/
    count<T extends ExpenseAccountCountArgs>(
      args?: Subset<T, ExpenseAccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExpenseAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExpenseAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExpenseAccountAggregateArgs>(args: Subset<T, ExpenseAccountAggregateArgs>): Prisma.PrismaPromise<GetExpenseAccountAggregateType<T>>

    /**
     * Group by ExpenseAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseAccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExpenseAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExpenseAccountGroupByArgs['orderBy'] }
        : { orderBy?: ExpenseAccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExpenseAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpenseAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExpenseAccount model
   */
  readonly fields: ExpenseAccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExpenseAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExpenseAccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    entries_from<T extends ExpenseAccount$entries_fromArgs<ExtArgs> = {}>(args?: Subset<T, ExpenseAccount$entries_fromArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    entries_to<T extends ExpenseAccount$entries_toArgs<ExtArgs> = {}>(args?: Subset<T, ExpenseAccount$entries_toArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExpenseAccount model
   */
  interface ExpenseAccountFieldRefs {
    readonly id: FieldRef<"ExpenseAccount", 'Int'>
    readonly uuid: FieldRef<"ExpenseAccount", 'String'>
    readonly user_uuid: FieldRef<"ExpenseAccount", 'String'>
    readonly name: FieldRef<"ExpenseAccount", 'String'>
    readonly icon: FieldRef<"ExpenseAccount", 'String'>
    readonly color: FieldRef<"ExpenseAccount", 'String'>
    readonly balance: FieldRef<"ExpenseAccount", 'Decimal'>
    readonly created_at: FieldRef<"ExpenseAccount", 'DateTime'>
    readonly updated_at: FieldRef<"ExpenseAccount", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExpenseAccount findUnique
   */
  export type ExpenseAccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseAccount
     */
    select?: ExpenseAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseAccount
     */
    omit?: ExpenseAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseAccountInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseAccount to fetch.
     */
    where: ExpenseAccountWhereUniqueInput
  }

  /**
   * ExpenseAccount findUniqueOrThrow
   */
  export type ExpenseAccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseAccount
     */
    select?: ExpenseAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseAccount
     */
    omit?: ExpenseAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseAccountInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseAccount to fetch.
     */
    where: ExpenseAccountWhereUniqueInput
  }

  /**
   * ExpenseAccount findFirst
   */
  export type ExpenseAccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseAccount
     */
    select?: ExpenseAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseAccount
     */
    omit?: ExpenseAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseAccountInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseAccount to fetch.
     */
    where?: ExpenseAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseAccounts to fetch.
     */
    orderBy?: ExpenseAccountOrderByWithRelationInput | ExpenseAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExpenseAccounts.
     */
    cursor?: ExpenseAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExpenseAccounts.
     */
    distinct?: ExpenseAccountScalarFieldEnum | ExpenseAccountScalarFieldEnum[]
  }

  /**
   * ExpenseAccount findFirstOrThrow
   */
  export type ExpenseAccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseAccount
     */
    select?: ExpenseAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseAccount
     */
    omit?: ExpenseAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseAccountInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseAccount to fetch.
     */
    where?: ExpenseAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseAccounts to fetch.
     */
    orderBy?: ExpenseAccountOrderByWithRelationInput | ExpenseAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExpenseAccounts.
     */
    cursor?: ExpenseAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseAccounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExpenseAccounts.
     */
    distinct?: ExpenseAccountScalarFieldEnum | ExpenseAccountScalarFieldEnum[]
  }

  /**
   * ExpenseAccount findMany
   */
  export type ExpenseAccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseAccount
     */
    select?: ExpenseAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseAccount
     */
    omit?: ExpenseAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseAccountInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseAccounts to fetch.
     */
    where?: ExpenseAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseAccounts to fetch.
     */
    orderBy?: ExpenseAccountOrderByWithRelationInput | ExpenseAccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExpenseAccounts.
     */
    cursor?: ExpenseAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseAccounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseAccounts.
     */
    skip?: number
    distinct?: ExpenseAccountScalarFieldEnum | ExpenseAccountScalarFieldEnum[]
  }

  /**
   * ExpenseAccount create
   */
  export type ExpenseAccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseAccount
     */
    select?: ExpenseAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseAccount
     */
    omit?: ExpenseAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseAccountInclude<ExtArgs> | null
    /**
     * The data needed to create a ExpenseAccount.
     */
    data: XOR<ExpenseAccountCreateInput, ExpenseAccountUncheckedCreateInput>
  }

  /**
   * ExpenseAccount createMany
   */
  export type ExpenseAccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExpenseAccounts.
     */
    data: ExpenseAccountCreateManyInput | ExpenseAccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExpenseAccount createManyAndReturn
   */
  export type ExpenseAccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseAccount
     */
    select?: ExpenseAccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseAccount
     */
    omit?: ExpenseAccountOmit<ExtArgs> | null
    /**
     * The data used to create many ExpenseAccounts.
     */
    data: ExpenseAccountCreateManyInput | ExpenseAccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseAccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExpenseAccount update
   */
  export type ExpenseAccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseAccount
     */
    select?: ExpenseAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseAccount
     */
    omit?: ExpenseAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseAccountInclude<ExtArgs> | null
    /**
     * The data needed to update a ExpenseAccount.
     */
    data: XOR<ExpenseAccountUpdateInput, ExpenseAccountUncheckedUpdateInput>
    /**
     * Choose, which ExpenseAccount to update.
     */
    where: ExpenseAccountWhereUniqueInput
  }

  /**
   * ExpenseAccount updateMany
   */
  export type ExpenseAccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExpenseAccounts.
     */
    data: XOR<ExpenseAccountUpdateManyMutationInput, ExpenseAccountUncheckedUpdateManyInput>
    /**
     * Filter which ExpenseAccounts to update
     */
    where?: ExpenseAccountWhereInput
    /**
     * Limit how many ExpenseAccounts to update.
     */
    limit?: number
  }

  /**
   * ExpenseAccount updateManyAndReturn
   */
  export type ExpenseAccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseAccount
     */
    select?: ExpenseAccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseAccount
     */
    omit?: ExpenseAccountOmit<ExtArgs> | null
    /**
     * The data used to update ExpenseAccounts.
     */
    data: XOR<ExpenseAccountUpdateManyMutationInput, ExpenseAccountUncheckedUpdateManyInput>
    /**
     * Filter which ExpenseAccounts to update
     */
    where?: ExpenseAccountWhereInput
    /**
     * Limit how many ExpenseAccounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseAccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExpenseAccount upsert
   */
  export type ExpenseAccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseAccount
     */
    select?: ExpenseAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseAccount
     */
    omit?: ExpenseAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseAccountInclude<ExtArgs> | null
    /**
     * The filter to search for the ExpenseAccount to update in case it exists.
     */
    where: ExpenseAccountWhereUniqueInput
    /**
     * In case the ExpenseAccount found by the `where` argument doesn't exist, create a new ExpenseAccount with this data.
     */
    create: XOR<ExpenseAccountCreateInput, ExpenseAccountUncheckedCreateInput>
    /**
     * In case the ExpenseAccount was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExpenseAccountUpdateInput, ExpenseAccountUncheckedUpdateInput>
  }

  /**
   * ExpenseAccount delete
   */
  export type ExpenseAccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseAccount
     */
    select?: ExpenseAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseAccount
     */
    omit?: ExpenseAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseAccountInclude<ExtArgs> | null
    /**
     * Filter which ExpenseAccount to delete.
     */
    where: ExpenseAccountWhereUniqueInput
  }

  /**
   * ExpenseAccount deleteMany
   */
  export type ExpenseAccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExpenseAccounts to delete
     */
    where?: ExpenseAccountWhereInput
    /**
     * Limit how many ExpenseAccounts to delete.
     */
    limit?: number
  }

  /**
   * ExpenseAccount.entries_from
   */
  export type ExpenseAccount$entries_fromArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseEntry
     */
    select?: ExpenseEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseEntry
     */
    omit?: ExpenseEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseEntryInclude<ExtArgs> | null
    where?: ExpenseEntryWhereInput
    orderBy?: ExpenseEntryOrderByWithRelationInput | ExpenseEntryOrderByWithRelationInput[]
    cursor?: ExpenseEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseEntryScalarFieldEnum | ExpenseEntryScalarFieldEnum[]
  }

  /**
   * ExpenseAccount.entries_to
   */
  export type ExpenseAccount$entries_toArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseEntry
     */
    select?: ExpenseEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseEntry
     */
    omit?: ExpenseEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseEntryInclude<ExtArgs> | null
    where?: ExpenseEntryWhereInput
    orderBy?: ExpenseEntryOrderByWithRelationInput | ExpenseEntryOrderByWithRelationInput[]
    cursor?: ExpenseEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseEntryScalarFieldEnum | ExpenseEntryScalarFieldEnum[]
  }

  /**
   * ExpenseAccount without action
   */
  export type ExpenseAccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseAccount
     */
    select?: ExpenseAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseAccount
     */
    omit?: ExpenseAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseAccountInclude<ExtArgs> | null
  }


  /**
   * Model ExpenseCategory
   */

  export type AggregateExpenseCategory = {
    _count: ExpenseCategoryCountAggregateOutputType | null
    _avg: ExpenseCategoryAvgAggregateOutputType | null
    _sum: ExpenseCategorySumAggregateOutputType | null
    _min: ExpenseCategoryMinAggregateOutputType | null
    _max: ExpenseCategoryMaxAggregateOutputType | null
  }

  export type ExpenseCategoryAvgAggregateOutputType = {
    id: number | null
  }

  export type ExpenseCategorySumAggregateOutputType = {
    id: number | null
  }

  export type ExpenseCategoryMinAggregateOutputType = {
    id: number | null
    uuid: string | null
    user_uuid: string | null
    name: string | null
    icon: string | null
    color: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ExpenseCategoryMaxAggregateOutputType = {
    id: number | null
    uuid: string | null
    user_uuid: string | null
    name: string | null
    icon: string | null
    color: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ExpenseCategoryCountAggregateOutputType = {
    id: number
    uuid: number
    user_uuid: number
    name: number
    icon: number
    color: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ExpenseCategoryAvgAggregateInputType = {
    id?: true
  }

  export type ExpenseCategorySumAggregateInputType = {
    id?: true
  }

  export type ExpenseCategoryMinAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    name?: true
    icon?: true
    color?: true
    created_at?: true
    updated_at?: true
  }

  export type ExpenseCategoryMaxAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    name?: true
    icon?: true
    color?: true
    created_at?: true
    updated_at?: true
  }

  export type ExpenseCategoryCountAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    name?: true
    icon?: true
    color?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ExpenseCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExpenseCategory to aggregate.
     */
    where?: ExpenseCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseCategories to fetch.
     */
    orderBy?: ExpenseCategoryOrderByWithRelationInput | ExpenseCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExpenseCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExpenseCategories
    **/
    _count?: true | ExpenseCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExpenseCategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExpenseCategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpenseCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpenseCategoryMaxAggregateInputType
  }

  export type GetExpenseCategoryAggregateType<T extends ExpenseCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateExpenseCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExpenseCategory[P]>
      : GetScalarType<T[P], AggregateExpenseCategory[P]>
  }




  export type ExpenseCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseCategoryWhereInput
    orderBy?: ExpenseCategoryOrderByWithAggregationInput | ExpenseCategoryOrderByWithAggregationInput[]
    by: ExpenseCategoryScalarFieldEnum[] | ExpenseCategoryScalarFieldEnum
    having?: ExpenseCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpenseCategoryCountAggregateInputType | true
    _avg?: ExpenseCategoryAvgAggregateInputType
    _sum?: ExpenseCategorySumAggregateInputType
    _min?: ExpenseCategoryMinAggregateInputType
    _max?: ExpenseCategoryMaxAggregateInputType
  }

  export type ExpenseCategoryGroupByOutputType = {
    id: number
    uuid: string
    user_uuid: string | null
    name: string
    icon: string | null
    color: string | null
    created_at: Date
    updated_at: Date
    _count: ExpenseCategoryCountAggregateOutputType | null
    _avg: ExpenseCategoryAvgAggregateOutputType | null
    _sum: ExpenseCategorySumAggregateOutputType | null
    _min: ExpenseCategoryMinAggregateOutputType | null
    _max: ExpenseCategoryMaxAggregateOutputType | null
  }

  type GetExpenseCategoryGroupByPayload<T extends ExpenseCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExpenseCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExpenseCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExpenseCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], ExpenseCategoryGroupByOutputType[P]>
        }
      >
    >


  export type ExpenseCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    name?: boolean
    icon?: boolean
    color?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | ExpenseCategory$userArgs<ExtArgs>
    subcategories?: boolean | ExpenseCategory$subcategoriesArgs<ExtArgs>
    entries?: boolean | ExpenseCategory$entriesArgs<ExtArgs>
    _count?: boolean | ExpenseCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expenseCategory"]>

  export type ExpenseCategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    name?: boolean
    icon?: boolean
    color?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | ExpenseCategory$userArgs<ExtArgs>
  }, ExtArgs["result"]["expenseCategory"]>

  export type ExpenseCategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    name?: boolean
    icon?: boolean
    color?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | ExpenseCategory$userArgs<ExtArgs>
  }, ExtArgs["result"]["expenseCategory"]>

  export type ExpenseCategorySelectScalar = {
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    name?: boolean
    icon?: boolean
    color?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ExpenseCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "uuid" | "user_uuid" | "name" | "icon" | "color" | "created_at" | "updated_at", ExtArgs["result"]["expenseCategory"]>
  export type ExpenseCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | ExpenseCategory$userArgs<ExtArgs>
    subcategories?: boolean | ExpenseCategory$subcategoriesArgs<ExtArgs>
    entries?: boolean | ExpenseCategory$entriesArgs<ExtArgs>
    _count?: boolean | ExpenseCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ExpenseCategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | ExpenseCategory$userArgs<ExtArgs>
  }
  export type ExpenseCategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | ExpenseCategory$userArgs<ExtArgs>
  }

  export type $ExpenseCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExpenseCategory"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      subcategories: Prisma.$ExpenseSubcategoryPayload<ExtArgs>[]
      entries: Prisma.$ExpenseEntryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      uuid: string
      user_uuid: string | null
      name: string
      icon: string | null
      color: string | null
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["expenseCategory"]>
    composites: {}
  }

  type ExpenseCategoryGetPayload<S extends boolean | null | undefined | ExpenseCategoryDefaultArgs> = $Result.GetResult<Prisma.$ExpenseCategoryPayload, S>

  type ExpenseCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExpenseCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExpenseCategoryCountAggregateInputType | true
    }

  export interface ExpenseCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExpenseCategory'], meta: { name: 'ExpenseCategory' } }
    /**
     * Find zero or one ExpenseCategory that matches the filter.
     * @param {ExpenseCategoryFindUniqueArgs} args - Arguments to find a ExpenseCategory
     * @example
     * // Get one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExpenseCategoryFindUniqueArgs>(args: SelectSubset<T, ExpenseCategoryFindUniqueArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExpenseCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExpenseCategoryFindUniqueOrThrowArgs} args - Arguments to find a ExpenseCategory
     * @example
     * // Get one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExpenseCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ExpenseCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExpenseCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryFindFirstArgs} args - Arguments to find a ExpenseCategory
     * @example
     * // Get one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExpenseCategoryFindFirstArgs>(args?: SelectSubset<T, ExpenseCategoryFindFirstArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExpenseCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryFindFirstOrThrowArgs} args - Arguments to find a ExpenseCategory
     * @example
     * // Get one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExpenseCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ExpenseCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExpenseCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExpenseCategories
     * const expenseCategories = await prisma.expenseCategory.findMany()
     * 
     * // Get first 10 ExpenseCategories
     * const expenseCategories = await prisma.expenseCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const expenseCategoryWithIdOnly = await prisma.expenseCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExpenseCategoryFindManyArgs>(args?: SelectSubset<T, ExpenseCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExpenseCategory.
     * @param {ExpenseCategoryCreateArgs} args - Arguments to create a ExpenseCategory.
     * @example
     * // Create one ExpenseCategory
     * const ExpenseCategory = await prisma.expenseCategory.create({
     *   data: {
     *     // ... data to create a ExpenseCategory
     *   }
     * })
     * 
     */
    create<T extends ExpenseCategoryCreateArgs>(args: SelectSubset<T, ExpenseCategoryCreateArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExpenseCategories.
     * @param {ExpenseCategoryCreateManyArgs} args - Arguments to create many ExpenseCategories.
     * @example
     * // Create many ExpenseCategories
     * const expenseCategory = await prisma.expenseCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExpenseCategoryCreateManyArgs>(args?: SelectSubset<T, ExpenseCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExpenseCategories and returns the data saved in the database.
     * @param {ExpenseCategoryCreateManyAndReturnArgs} args - Arguments to create many ExpenseCategories.
     * @example
     * // Create many ExpenseCategories
     * const expenseCategory = await prisma.expenseCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExpenseCategories and only return the `id`
     * const expenseCategoryWithIdOnly = await prisma.expenseCategory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExpenseCategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, ExpenseCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExpenseCategory.
     * @param {ExpenseCategoryDeleteArgs} args - Arguments to delete one ExpenseCategory.
     * @example
     * // Delete one ExpenseCategory
     * const ExpenseCategory = await prisma.expenseCategory.delete({
     *   where: {
     *     // ... filter to delete one ExpenseCategory
     *   }
     * })
     * 
     */
    delete<T extends ExpenseCategoryDeleteArgs>(args: SelectSubset<T, ExpenseCategoryDeleteArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExpenseCategory.
     * @param {ExpenseCategoryUpdateArgs} args - Arguments to update one ExpenseCategory.
     * @example
     * // Update one ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExpenseCategoryUpdateArgs>(args: SelectSubset<T, ExpenseCategoryUpdateArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExpenseCategories.
     * @param {ExpenseCategoryDeleteManyArgs} args - Arguments to filter ExpenseCategories to delete.
     * @example
     * // Delete a few ExpenseCategories
     * const { count } = await prisma.expenseCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExpenseCategoryDeleteManyArgs>(args?: SelectSubset<T, ExpenseCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExpenseCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExpenseCategories
     * const expenseCategory = await prisma.expenseCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExpenseCategoryUpdateManyArgs>(args: SelectSubset<T, ExpenseCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExpenseCategories and returns the data updated in the database.
     * @param {ExpenseCategoryUpdateManyAndReturnArgs} args - Arguments to update many ExpenseCategories.
     * @example
     * // Update many ExpenseCategories
     * const expenseCategory = await prisma.expenseCategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExpenseCategories and only return the `id`
     * const expenseCategoryWithIdOnly = await prisma.expenseCategory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExpenseCategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, ExpenseCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExpenseCategory.
     * @param {ExpenseCategoryUpsertArgs} args - Arguments to update or create a ExpenseCategory.
     * @example
     * // Update or create a ExpenseCategory
     * const expenseCategory = await prisma.expenseCategory.upsert({
     *   create: {
     *     // ... data to create a ExpenseCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExpenseCategory we want to update
     *   }
     * })
     */
    upsert<T extends ExpenseCategoryUpsertArgs>(args: SelectSubset<T, ExpenseCategoryUpsertArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExpenseCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryCountArgs} args - Arguments to filter ExpenseCategories to count.
     * @example
     * // Count the number of ExpenseCategories
     * const count = await prisma.expenseCategory.count({
     *   where: {
     *     // ... the filter for the ExpenseCategories we want to count
     *   }
     * })
    **/
    count<T extends ExpenseCategoryCountArgs>(
      args?: Subset<T, ExpenseCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExpenseCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExpenseCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExpenseCategoryAggregateArgs>(args: Subset<T, ExpenseCategoryAggregateArgs>): Prisma.PrismaPromise<GetExpenseCategoryAggregateType<T>>

    /**
     * Group by ExpenseCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExpenseCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExpenseCategoryGroupByArgs['orderBy'] }
        : { orderBy?: ExpenseCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExpenseCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpenseCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExpenseCategory model
   */
  readonly fields: ExpenseCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExpenseCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExpenseCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends ExpenseCategory$userArgs<ExtArgs> = {}>(args?: Subset<T, ExpenseCategory$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    subcategories<T extends ExpenseCategory$subcategoriesArgs<ExtArgs> = {}>(args?: Subset<T, ExpenseCategory$subcategoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseSubcategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    entries<T extends ExpenseCategory$entriesArgs<ExtArgs> = {}>(args?: Subset<T, ExpenseCategory$entriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExpenseCategory model
   */
  interface ExpenseCategoryFieldRefs {
    readonly id: FieldRef<"ExpenseCategory", 'Int'>
    readonly uuid: FieldRef<"ExpenseCategory", 'String'>
    readonly user_uuid: FieldRef<"ExpenseCategory", 'String'>
    readonly name: FieldRef<"ExpenseCategory", 'String'>
    readonly icon: FieldRef<"ExpenseCategory", 'String'>
    readonly color: FieldRef<"ExpenseCategory", 'String'>
    readonly created_at: FieldRef<"ExpenseCategory", 'DateTime'>
    readonly updated_at: FieldRef<"ExpenseCategory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExpenseCategory findUnique
   */
  export type ExpenseCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseCategory to fetch.
     */
    where: ExpenseCategoryWhereUniqueInput
  }

  /**
   * ExpenseCategory findUniqueOrThrow
   */
  export type ExpenseCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseCategory to fetch.
     */
    where: ExpenseCategoryWhereUniqueInput
  }

  /**
   * ExpenseCategory findFirst
   */
  export type ExpenseCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseCategory to fetch.
     */
    where?: ExpenseCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseCategories to fetch.
     */
    orderBy?: ExpenseCategoryOrderByWithRelationInput | ExpenseCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExpenseCategories.
     */
    cursor?: ExpenseCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExpenseCategories.
     */
    distinct?: ExpenseCategoryScalarFieldEnum | ExpenseCategoryScalarFieldEnum[]
  }

  /**
   * ExpenseCategory findFirstOrThrow
   */
  export type ExpenseCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseCategory to fetch.
     */
    where?: ExpenseCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseCategories to fetch.
     */
    orderBy?: ExpenseCategoryOrderByWithRelationInput | ExpenseCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExpenseCategories.
     */
    cursor?: ExpenseCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExpenseCategories.
     */
    distinct?: ExpenseCategoryScalarFieldEnum | ExpenseCategoryScalarFieldEnum[]
  }

  /**
   * ExpenseCategory findMany
   */
  export type ExpenseCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseCategories to fetch.
     */
    where?: ExpenseCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseCategories to fetch.
     */
    orderBy?: ExpenseCategoryOrderByWithRelationInput | ExpenseCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExpenseCategories.
     */
    cursor?: ExpenseCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseCategories.
     */
    skip?: number
    distinct?: ExpenseCategoryScalarFieldEnum | ExpenseCategoryScalarFieldEnum[]
  }

  /**
   * ExpenseCategory create
   */
  export type ExpenseCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a ExpenseCategory.
     */
    data: XOR<ExpenseCategoryCreateInput, ExpenseCategoryUncheckedCreateInput>
  }

  /**
   * ExpenseCategory createMany
   */
  export type ExpenseCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExpenseCategories.
     */
    data: ExpenseCategoryCreateManyInput | ExpenseCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExpenseCategory createManyAndReturn
   */
  export type ExpenseCategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * The data used to create many ExpenseCategories.
     */
    data: ExpenseCategoryCreateManyInput | ExpenseCategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExpenseCategory update
   */
  export type ExpenseCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a ExpenseCategory.
     */
    data: XOR<ExpenseCategoryUpdateInput, ExpenseCategoryUncheckedUpdateInput>
    /**
     * Choose, which ExpenseCategory to update.
     */
    where: ExpenseCategoryWhereUniqueInput
  }

  /**
   * ExpenseCategory updateMany
   */
  export type ExpenseCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExpenseCategories.
     */
    data: XOR<ExpenseCategoryUpdateManyMutationInput, ExpenseCategoryUncheckedUpdateManyInput>
    /**
     * Filter which ExpenseCategories to update
     */
    where?: ExpenseCategoryWhereInput
    /**
     * Limit how many ExpenseCategories to update.
     */
    limit?: number
  }

  /**
   * ExpenseCategory updateManyAndReturn
   */
  export type ExpenseCategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * The data used to update ExpenseCategories.
     */
    data: XOR<ExpenseCategoryUpdateManyMutationInput, ExpenseCategoryUncheckedUpdateManyInput>
    /**
     * Filter which ExpenseCategories to update
     */
    where?: ExpenseCategoryWhereInput
    /**
     * Limit how many ExpenseCategories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExpenseCategory upsert
   */
  export type ExpenseCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the ExpenseCategory to update in case it exists.
     */
    where: ExpenseCategoryWhereUniqueInput
    /**
     * In case the ExpenseCategory found by the `where` argument doesn't exist, create a new ExpenseCategory with this data.
     */
    create: XOR<ExpenseCategoryCreateInput, ExpenseCategoryUncheckedCreateInput>
    /**
     * In case the ExpenseCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExpenseCategoryUpdateInput, ExpenseCategoryUncheckedUpdateInput>
  }

  /**
   * ExpenseCategory delete
   */
  export type ExpenseCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
    /**
     * Filter which ExpenseCategory to delete.
     */
    where: ExpenseCategoryWhereUniqueInput
  }

  /**
   * ExpenseCategory deleteMany
   */
  export type ExpenseCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExpenseCategories to delete
     */
    where?: ExpenseCategoryWhereInput
    /**
     * Limit how many ExpenseCategories to delete.
     */
    limit?: number
  }

  /**
   * ExpenseCategory.user
   */
  export type ExpenseCategory$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * ExpenseCategory.subcategories
   */
  export type ExpenseCategory$subcategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseSubcategory
     */
    select?: ExpenseSubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseSubcategory
     */
    omit?: ExpenseSubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseSubcategoryInclude<ExtArgs> | null
    where?: ExpenseSubcategoryWhereInput
    orderBy?: ExpenseSubcategoryOrderByWithRelationInput | ExpenseSubcategoryOrderByWithRelationInput[]
    cursor?: ExpenseSubcategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseSubcategoryScalarFieldEnum | ExpenseSubcategoryScalarFieldEnum[]
  }

  /**
   * ExpenseCategory.entries
   */
  export type ExpenseCategory$entriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseEntry
     */
    select?: ExpenseEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseEntry
     */
    omit?: ExpenseEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseEntryInclude<ExtArgs> | null
    where?: ExpenseEntryWhereInput
    orderBy?: ExpenseEntryOrderByWithRelationInput | ExpenseEntryOrderByWithRelationInput[]
    cursor?: ExpenseEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseEntryScalarFieldEnum | ExpenseEntryScalarFieldEnum[]
  }

  /**
   * ExpenseCategory without action
   */
  export type ExpenseCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseCategory
     */
    select?: ExpenseCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseCategory
     */
    omit?: ExpenseCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseCategoryInclude<ExtArgs> | null
  }


  /**
   * Model ExpenseSubcategory
   */

  export type AggregateExpenseSubcategory = {
    _count: ExpenseSubcategoryCountAggregateOutputType | null
    _avg: ExpenseSubcategoryAvgAggregateOutputType | null
    _sum: ExpenseSubcategorySumAggregateOutputType | null
    _min: ExpenseSubcategoryMinAggregateOutputType | null
    _max: ExpenseSubcategoryMaxAggregateOutputType | null
  }

  export type ExpenseSubcategoryAvgAggregateOutputType = {
    id: number | null
  }

  export type ExpenseSubcategorySumAggregateOutputType = {
    id: number | null
  }

  export type ExpenseSubcategoryMinAggregateOutputType = {
    id: number | null
    uuid: string | null
    user_uuid: string | null
    category_uuid: string | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ExpenseSubcategoryMaxAggregateOutputType = {
    id: number | null
    uuid: string | null
    user_uuid: string | null
    category_uuid: string | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ExpenseSubcategoryCountAggregateOutputType = {
    id: number
    uuid: number
    user_uuid: number
    category_uuid: number
    name: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ExpenseSubcategoryAvgAggregateInputType = {
    id?: true
  }

  export type ExpenseSubcategorySumAggregateInputType = {
    id?: true
  }

  export type ExpenseSubcategoryMinAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    category_uuid?: true
    name?: true
    created_at?: true
    updated_at?: true
  }

  export type ExpenseSubcategoryMaxAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    category_uuid?: true
    name?: true
    created_at?: true
    updated_at?: true
  }

  export type ExpenseSubcategoryCountAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    category_uuid?: true
    name?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ExpenseSubcategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExpenseSubcategory to aggregate.
     */
    where?: ExpenseSubcategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseSubcategories to fetch.
     */
    orderBy?: ExpenseSubcategoryOrderByWithRelationInput | ExpenseSubcategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExpenseSubcategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseSubcategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseSubcategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExpenseSubcategories
    **/
    _count?: true | ExpenseSubcategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExpenseSubcategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExpenseSubcategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpenseSubcategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpenseSubcategoryMaxAggregateInputType
  }

  export type GetExpenseSubcategoryAggregateType<T extends ExpenseSubcategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateExpenseSubcategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExpenseSubcategory[P]>
      : GetScalarType<T[P], AggregateExpenseSubcategory[P]>
  }




  export type ExpenseSubcategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseSubcategoryWhereInput
    orderBy?: ExpenseSubcategoryOrderByWithAggregationInput | ExpenseSubcategoryOrderByWithAggregationInput[]
    by: ExpenseSubcategoryScalarFieldEnum[] | ExpenseSubcategoryScalarFieldEnum
    having?: ExpenseSubcategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpenseSubcategoryCountAggregateInputType | true
    _avg?: ExpenseSubcategoryAvgAggregateInputType
    _sum?: ExpenseSubcategorySumAggregateInputType
    _min?: ExpenseSubcategoryMinAggregateInputType
    _max?: ExpenseSubcategoryMaxAggregateInputType
  }

  export type ExpenseSubcategoryGroupByOutputType = {
    id: number
    uuid: string
    user_uuid: string | null
    category_uuid: string
    name: string
    created_at: Date
    updated_at: Date
    _count: ExpenseSubcategoryCountAggregateOutputType | null
    _avg: ExpenseSubcategoryAvgAggregateOutputType | null
    _sum: ExpenseSubcategorySumAggregateOutputType | null
    _min: ExpenseSubcategoryMinAggregateOutputType | null
    _max: ExpenseSubcategoryMaxAggregateOutputType | null
  }

  type GetExpenseSubcategoryGroupByPayload<T extends ExpenseSubcategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExpenseSubcategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExpenseSubcategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExpenseSubcategoryGroupByOutputType[P]>
            : GetScalarType<T[P], ExpenseSubcategoryGroupByOutputType[P]>
        }
      >
    >


  export type ExpenseSubcategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    category_uuid?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | ExpenseSubcategory$userArgs<ExtArgs>
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
    entries?: boolean | ExpenseSubcategory$entriesArgs<ExtArgs>
    _count?: boolean | ExpenseSubcategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expenseSubcategory"]>

  export type ExpenseSubcategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    category_uuid?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | ExpenseSubcategory$userArgs<ExtArgs>
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expenseSubcategory"]>

  export type ExpenseSubcategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    category_uuid?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | ExpenseSubcategory$userArgs<ExtArgs>
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expenseSubcategory"]>

  export type ExpenseSubcategorySelectScalar = {
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    category_uuid?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ExpenseSubcategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "uuid" | "user_uuid" | "category_uuid" | "name" | "created_at" | "updated_at", ExtArgs["result"]["expenseSubcategory"]>
  export type ExpenseSubcategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | ExpenseSubcategory$userArgs<ExtArgs>
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
    entries?: boolean | ExpenseSubcategory$entriesArgs<ExtArgs>
    _count?: boolean | ExpenseSubcategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ExpenseSubcategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | ExpenseSubcategory$userArgs<ExtArgs>
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
  }
  export type ExpenseSubcategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | ExpenseSubcategory$userArgs<ExtArgs>
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
  }

  export type $ExpenseSubcategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExpenseSubcategory"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      category: Prisma.$ExpenseCategoryPayload<ExtArgs>
      entries: Prisma.$ExpenseEntryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      uuid: string
      user_uuid: string | null
      category_uuid: string
      name: string
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["expenseSubcategory"]>
    composites: {}
  }

  type ExpenseSubcategoryGetPayload<S extends boolean | null | undefined | ExpenseSubcategoryDefaultArgs> = $Result.GetResult<Prisma.$ExpenseSubcategoryPayload, S>

  type ExpenseSubcategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExpenseSubcategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExpenseSubcategoryCountAggregateInputType | true
    }

  export interface ExpenseSubcategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExpenseSubcategory'], meta: { name: 'ExpenseSubcategory' } }
    /**
     * Find zero or one ExpenseSubcategory that matches the filter.
     * @param {ExpenseSubcategoryFindUniqueArgs} args - Arguments to find a ExpenseSubcategory
     * @example
     * // Get one ExpenseSubcategory
     * const expenseSubcategory = await prisma.expenseSubcategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExpenseSubcategoryFindUniqueArgs>(args: SelectSubset<T, ExpenseSubcategoryFindUniqueArgs<ExtArgs>>): Prisma__ExpenseSubcategoryClient<$Result.GetResult<Prisma.$ExpenseSubcategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExpenseSubcategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExpenseSubcategoryFindUniqueOrThrowArgs} args - Arguments to find a ExpenseSubcategory
     * @example
     * // Get one ExpenseSubcategory
     * const expenseSubcategory = await prisma.expenseSubcategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExpenseSubcategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ExpenseSubcategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExpenseSubcategoryClient<$Result.GetResult<Prisma.$ExpenseSubcategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExpenseSubcategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseSubcategoryFindFirstArgs} args - Arguments to find a ExpenseSubcategory
     * @example
     * // Get one ExpenseSubcategory
     * const expenseSubcategory = await prisma.expenseSubcategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExpenseSubcategoryFindFirstArgs>(args?: SelectSubset<T, ExpenseSubcategoryFindFirstArgs<ExtArgs>>): Prisma__ExpenseSubcategoryClient<$Result.GetResult<Prisma.$ExpenseSubcategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExpenseSubcategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseSubcategoryFindFirstOrThrowArgs} args - Arguments to find a ExpenseSubcategory
     * @example
     * // Get one ExpenseSubcategory
     * const expenseSubcategory = await prisma.expenseSubcategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExpenseSubcategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ExpenseSubcategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExpenseSubcategoryClient<$Result.GetResult<Prisma.$ExpenseSubcategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExpenseSubcategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseSubcategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExpenseSubcategories
     * const expenseSubcategories = await prisma.expenseSubcategory.findMany()
     * 
     * // Get first 10 ExpenseSubcategories
     * const expenseSubcategories = await prisma.expenseSubcategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const expenseSubcategoryWithIdOnly = await prisma.expenseSubcategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExpenseSubcategoryFindManyArgs>(args?: SelectSubset<T, ExpenseSubcategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseSubcategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExpenseSubcategory.
     * @param {ExpenseSubcategoryCreateArgs} args - Arguments to create a ExpenseSubcategory.
     * @example
     * // Create one ExpenseSubcategory
     * const ExpenseSubcategory = await prisma.expenseSubcategory.create({
     *   data: {
     *     // ... data to create a ExpenseSubcategory
     *   }
     * })
     * 
     */
    create<T extends ExpenseSubcategoryCreateArgs>(args: SelectSubset<T, ExpenseSubcategoryCreateArgs<ExtArgs>>): Prisma__ExpenseSubcategoryClient<$Result.GetResult<Prisma.$ExpenseSubcategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExpenseSubcategories.
     * @param {ExpenseSubcategoryCreateManyArgs} args - Arguments to create many ExpenseSubcategories.
     * @example
     * // Create many ExpenseSubcategories
     * const expenseSubcategory = await prisma.expenseSubcategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExpenseSubcategoryCreateManyArgs>(args?: SelectSubset<T, ExpenseSubcategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExpenseSubcategories and returns the data saved in the database.
     * @param {ExpenseSubcategoryCreateManyAndReturnArgs} args - Arguments to create many ExpenseSubcategories.
     * @example
     * // Create many ExpenseSubcategories
     * const expenseSubcategory = await prisma.expenseSubcategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExpenseSubcategories and only return the `id`
     * const expenseSubcategoryWithIdOnly = await prisma.expenseSubcategory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExpenseSubcategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, ExpenseSubcategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseSubcategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExpenseSubcategory.
     * @param {ExpenseSubcategoryDeleteArgs} args - Arguments to delete one ExpenseSubcategory.
     * @example
     * // Delete one ExpenseSubcategory
     * const ExpenseSubcategory = await prisma.expenseSubcategory.delete({
     *   where: {
     *     // ... filter to delete one ExpenseSubcategory
     *   }
     * })
     * 
     */
    delete<T extends ExpenseSubcategoryDeleteArgs>(args: SelectSubset<T, ExpenseSubcategoryDeleteArgs<ExtArgs>>): Prisma__ExpenseSubcategoryClient<$Result.GetResult<Prisma.$ExpenseSubcategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExpenseSubcategory.
     * @param {ExpenseSubcategoryUpdateArgs} args - Arguments to update one ExpenseSubcategory.
     * @example
     * // Update one ExpenseSubcategory
     * const expenseSubcategory = await prisma.expenseSubcategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExpenseSubcategoryUpdateArgs>(args: SelectSubset<T, ExpenseSubcategoryUpdateArgs<ExtArgs>>): Prisma__ExpenseSubcategoryClient<$Result.GetResult<Prisma.$ExpenseSubcategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExpenseSubcategories.
     * @param {ExpenseSubcategoryDeleteManyArgs} args - Arguments to filter ExpenseSubcategories to delete.
     * @example
     * // Delete a few ExpenseSubcategories
     * const { count } = await prisma.expenseSubcategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExpenseSubcategoryDeleteManyArgs>(args?: SelectSubset<T, ExpenseSubcategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExpenseSubcategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseSubcategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExpenseSubcategories
     * const expenseSubcategory = await prisma.expenseSubcategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExpenseSubcategoryUpdateManyArgs>(args: SelectSubset<T, ExpenseSubcategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExpenseSubcategories and returns the data updated in the database.
     * @param {ExpenseSubcategoryUpdateManyAndReturnArgs} args - Arguments to update many ExpenseSubcategories.
     * @example
     * // Update many ExpenseSubcategories
     * const expenseSubcategory = await prisma.expenseSubcategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExpenseSubcategories and only return the `id`
     * const expenseSubcategoryWithIdOnly = await prisma.expenseSubcategory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExpenseSubcategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, ExpenseSubcategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseSubcategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExpenseSubcategory.
     * @param {ExpenseSubcategoryUpsertArgs} args - Arguments to update or create a ExpenseSubcategory.
     * @example
     * // Update or create a ExpenseSubcategory
     * const expenseSubcategory = await prisma.expenseSubcategory.upsert({
     *   create: {
     *     // ... data to create a ExpenseSubcategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExpenseSubcategory we want to update
     *   }
     * })
     */
    upsert<T extends ExpenseSubcategoryUpsertArgs>(args: SelectSubset<T, ExpenseSubcategoryUpsertArgs<ExtArgs>>): Prisma__ExpenseSubcategoryClient<$Result.GetResult<Prisma.$ExpenseSubcategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExpenseSubcategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseSubcategoryCountArgs} args - Arguments to filter ExpenseSubcategories to count.
     * @example
     * // Count the number of ExpenseSubcategories
     * const count = await prisma.expenseSubcategory.count({
     *   where: {
     *     // ... the filter for the ExpenseSubcategories we want to count
     *   }
     * })
    **/
    count<T extends ExpenseSubcategoryCountArgs>(
      args?: Subset<T, ExpenseSubcategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExpenseSubcategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExpenseSubcategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseSubcategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExpenseSubcategoryAggregateArgs>(args: Subset<T, ExpenseSubcategoryAggregateArgs>): Prisma.PrismaPromise<GetExpenseSubcategoryAggregateType<T>>

    /**
     * Group by ExpenseSubcategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseSubcategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExpenseSubcategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExpenseSubcategoryGroupByArgs['orderBy'] }
        : { orderBy?: ExpenseSubcategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExpenseSubcategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpenseSubcategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExpenseSubcategory model
   */
  readonly fields: ExpenseSubcategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExpenseSubcategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExpenseSubcategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends ExpenseSubcategory$userArgs<ExtArgs> = {}>(args?: Subset<T, ExpenseSubcategory$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    category<T extends ExpenseCategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExpenseCategoryDefaultArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    entries<T extends ExpenseSubcategory$entriesArgs<ExtArgs> = {}>(args?: Subset<T, ExpenseSubcategory$entriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExpenseSubcategory model
   */
  interface ExpenseSubcategoryFieldRefs {
    readonly id: FieldRef<"ExpenseSubcategory", 'Int'>
    readonly uuid: FieldRef<"ExpenseSubcategory", 'String'>
    readonly user_uuid: FieldRef<"ExpenseSubcategory", 'String'>
    readonly category_uuid: FieldRef<"ExpenseSubcategory", 'String'>
    readonly name: FieldRef<"ExpenseSubcategory", 'String'>
    readonly created_at: FieldRef<"ExpenseSubcategory", 'DateTime'>
    readonly updated_at: FieldRef<"ExpenseSubcategory", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExpenseSubcategory findUnique
   */
  export type ExpenseSubcategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseSubcategory
     */
    select?: ExpenseSubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseSubcategory
     */
    omit?: ExpenseSubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseSubcategoryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseSubcategory to fetch.
     */
    where: ExpenseSubcategoryWhereUniqueInput
  }

  /**
   * ExpenseSubcategory findUniqueOrThrow
   */
  export type ExpenseSubcategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseSubcategory
     */
    select?: ExpenseSubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseSubcategory
     */
    omit?: ExpenseSubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseSubcategoryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseSubcategory to fetch.
     */
    where: ExpenseSubcategoryWhereUniqueInput
  }

  /**
   * ExpenseSubcategory findFirst
   */
  export type ExpenseSubcategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseSubcategory
     */
    select?: ExpenseSubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseSubcategory
     */
    omit?: ExpenseSubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseSubcategoryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseSubcategory to fetch.
     */
    where?: ExpenseSubcategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseSubcategories to fetch.
     */
    orderBy?: ExpenseSubcategoryOrderByWithRelationInput | ExpenseSubcategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExpenseSubcategories.
     */
    cursor?: ExpenseSubcategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseSubcategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseSubcategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExpenseSubcategories.
     */
    distinct?: ExpenseSubcategoryScalarFieldEnum | ExpenseSubcategoryScalarFieldEnum[]
  }

  /**
   * ExpenseSubcategory findFirstOrThrow
   */
  export type ExpenseSubcategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseSubcategory
     */
    select?: ExpenseSubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseSubcategory
     */
    omit?: ExpenseSubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseSubcategoryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseSubcategory to fetch.
     */
    where?: ExpenseSubcategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseSubcategories to fetch.
     */
    orderBy?: ExpenseSubcategoryOrderByWithRelationInput | ExpenseSubcategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExpenseSubcategories.
     */
    cursor?: ExpenseSubcategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseSubcategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseSubcategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExpenseSubcategories.
     */
    distinct?: ExpenseSubcategoryScalarFieldEnum | ExpenseSubcategoryScalarFieldEnum[]
  }

  /**
   * ExpenseSubcategory findMany
   */
  export type ExpenseSubcategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseSubcategory
     */
    select?: ExpenseSubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseSubcategory
     */
    omit?: ExpenseSubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseSubcategoryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseSubcategories to fetch.
     */
    where?: ExpenseSubcategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseSubcategories to fetch.
     */
    orderBy?: ExpenseSubcategoryOrderByWithRelationInput | ExpenseSubcategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExpenseSubcategories.
     */
    cursor?: ExpenseSubcategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseSubcategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseSubcategories.
     */
    skip?: number
    distinct?: ExpenseSubcategoryScalarFieldEnum | ExpenseSubcategoryScalarFieldEnum[]
  }

  /**
   * ExpenseSubcategory create
   */
  export type ExpenseSubcategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseSubcategory
     */
    select?: ExpenseSubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseSubcategory
     */
    omit?: ExpenseSubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseSubcategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a ExpenseSubcategory.
     */
    data: XOR<ExpenseSubcategoryCreateInput, ExpenseSubcategoryUncheckedCreateInput>
  }

  /**
   * ExpenseSubcategory createMany
   */
  export type ExpenseSubcategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExpenseSubcategories.
     */
    data: ExpenseSubcategoryCreateManyInput | ExpenseSubcategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExpenseSubcategory createManyAndReturn
   */
  export type ExpenseSubcategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseSubcategory
     */
    select?: ExpenseSubcategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseSubcategory
     */
    omit?: ExpenseSubcategoryOmit<ExtArgs> | null
    /**
     * The data used to create many ExpenseSubcategories.
     */
    data: ExpenseSubcategoryCreateManyInput | ExpenseSubcategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseSubcategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExpenseSubcategory update
   */
  export type ExpenseSubcategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseSubcategory
     */
    select?: ExpenseSubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseSubcategory
     */
    omit?: ExpenseSubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseSubcategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a ExpenseSubcategory.
     */
    data: XOR<ExpenseSubcategoryUpdateInput, ExpenseSubcategoryUncheckedUpdateInput>
    /**
     * Choose, which ExpenseSubcategory to update.
     */
    where: ExpenseSubcategoryWhereUniqueInput
  }

  /**
   * ExpenseSubcategory updateMany
   */
  export type ExpenseSubcategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExpenseSubcategories.
     */
    data: XOR<ExpenseSubcategoryUpdateManyMutationInput, ExpenseSubcategoryUncheckedUpdateManyInput>
    /**
     * Filter which ExpenseSubcategories to update
     */
    where?: ExpenseSubcategoryWhereInput
    /**
     * Limit how many ExpenseSubcategories to update.
     */
    limit?: number
  }

  /**
   * ExpenseSubcategory updateManyAndReturn
   */
  export type ExpenseSubcategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseSubcategory
     */
    select?: ExpenseSubcategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseSubcategory
     */
    omit?: ExpenseSubcategoryOmit<ExtArgs> | null
    /**
     * The data used to update ExpenseSubcategories.
     */
    data: XOR<ExpenseSubcategoryUpdateManyMutationInput, ExpenseSubcategoryUncheckedUpdateManyInput>
    /**
     * Filter which ExpenseSubcategories to update
     */
    where?: ExpenseSubcategoryWhereInput
    /**
     * Limit how many ExpenseSubcategories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseSubcategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExpenseSubcategory upsert
   */
  export type ExpenseSubcategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseSubcategory
     */
    select?: ExpenseSubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseSubcategory
     */
    omit?: ExpenseSubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseSubcategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the ExpenseSubcategory to update in case it exists.
     */
    where: ExpenseSubcategoryWhereUniqueInput
    /**
     * In case the ExpenseSubcategory found by the `where` argument doesn't exist, create a new ExpenseSubcategory with this data.
     */
    create: XOR<ExpenseSubcategoryCreateInput, ExpenseSubcategoryUncheckedCreateInput>
    /**
     * In case the ExpenseSubcategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExpenseSubcategoryUpdateInput, ExpenseSubcategoryUncheckedUpdateInput>
  }

  /**
   * ExpenseSubcategory delete
   */
  export type ExpenseSubcategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseSubcategory
     */
    select?: ExpenseSubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseSubcategory
     */
    omit?: ExpenseSubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseSubcategoryInclude<ExtArgs> | null
    /**
     * Filter which ExpenseSubcategory to delete.
     */
    where: ExpenseSubcategoryWhereUniqueInput
  }

  /**
   * ExpenseSubcategory deleteMany
   */
  export type ExpenseSubcategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExpenseSubcategories to delete
     */
    where?: ExpenseSubcategoryWhereInput
    /**
     * Limit how many ExpenseSubcategories to delete.
     */
    limit?: number
  }

  /**
   * ExpenseSubcategory.user
   */
  export type ExpenseSubcategory$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * ExpenseSubcategory.entries
   */
  export type ExpenseSubcategory$entriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseEntry
     */
    select?: ExpenseEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseEntry
     */
    omit?: ExpenseEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseEntryInclude<ExtArgs> | null
    where?: ExpenseEntryWhereInput
    orderBy?: ExpenseEntryOrderByWithRelationInput | ExpenseEntryOrderByWithRelationInput[]
    cursor?: ExpenseEntryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExpenseEntryScalarFieldEnum | ExpenseEntryScalarFieldEnum[]
  }

  /**
   * ExpenseSubcategory without action
   */
  export type ExpenseSubcategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseSubcategory
     */
    select?: ExpenseSubcategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseSubcategory
     */
    omit?: ExpenseSubcategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseSubcategoryInclude<ExtArgs> | null
  }


  /**
   * Model ExpenseEntry
   */

  export type AggregateExpenseEntry = {
    _count: ExpenseEntryCountAggregateOutputType | null
    _avg: ExpenseEntryAvgAggregateOutputType | null
    _sum: ExpenseEntrySumAggregateOutputType | null
    _min: ExpenseEntryMinAggregateOutputType | null
    _max: ExpenseEntryMaxAggregateOutputType | null
  }

  export type ExpenseEntryAvgAggregateOutputType = {
    id: number | null
    amount: Decimal | null
  }

  export type ExpenseEntrySumAggregateOutputType = {
    id: number | null
    amount: Decimal | null
  }

  export type ExpenseEntryMinAggregateOutputType = {
    id: number | null
    uuid: string | null
    user_uuid: string | null
    type: $Enums.ExpenseEntryType | null
    amount: Decimal | null
    description: string | null
    from_account_uuid: string | null
    to_account_uuid: string | null
    category_uuid: string | null
    subcategory_uuid: string | null
    entry_date: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ExpenseEntryMaxAggregateOutputType = {
    id: number | null
    uuid: string | null
    user_uuid: string | null
    type: $Enums.ExpenseEntryType | null
    amount: Decimal | null
    description: string | null
    from_account_uuid: string | null
    to_account_uuid: string | null
    category_uuid: string | null
    subcategory_uuid: string | null
    entry_date: Date | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type ExpenseEntryCountAggregateOutputType = {
    id: number
    uuid: number
    user_uuid: number
    type: number
    amount: number
    description: number
    from_account_uuid: number
    to_account_uuid: number
    category_uuid: number
    subcategory_uuid: number
    entry_date: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type ExpenseEntryAvgAggregateInputType = {
    id?: true
    amount?: true
  }

  export type ExpenseEntrySumAggregateInputType = {
    id?: true
    amount?: true
  }

  export type ExpenseEntryMinAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    type?: true
    amount?: true
    description?: true
    from_account_uuid?: true
    to_account_uuid?: true
    category_uuid?: true
    subcategory_uuid?: true
    entry_date?: true
    created_at?: true
    updated_at?: true
  }

  export type ExpenseEntryMaxAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    type?: true
    amount?: true
    description?: true
    from_account_uuid?: true
    to_account_uuid?: true
    category_uuid?: true
    subcategory_uuid?: true
    entry_date?: true
    created_at?: true
    updated_at?: true
  }

  export type ExpenseEntryCountAggregateInputType = {
    id?: true
    uuid?: true
    user_uuid?: true
    type?: true
    amount?: true
    description?: true
    from_account_uuid?: true
    to_account_uuid?: true
    category_uuid?: true
    subcategory_uuid?: true
    entry_date?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type ExpenseEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExpenseEntry to aggregate.
     */
    where?: ExpenseEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseEntries to fetch.
     */
    orderBy?: ExpenseEntryOrderByWithRelationInput | ExpenseEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExpenseEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExpenseEntries
    **/
    _count?: true | ExpenseEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExpenseEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExpenseEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExpenseEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExpenseEntryMaxAggregateInputType
  }

  export type GetExpenseEntryAggregateType<T extends ExpenseEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateExpenseEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExpenseEntry[P]>
      : GetScalarType<T[P], AggregateExpenseEntry[P]>
  }




  export type ExpenseEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExpenseEntryWhereInput
    orderBy?: ExpenseEntryOrderByWithAggregationInput | ExpenseEntryOrderByWithAggregationInput[]
    by: ExpenseEntryScalarFieldEnum[] | ExpenseEntryScalarFieldEnum
    having?: ExpenseEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExpenseEntryCountAggregateInputType | true
    _avg?: ExpenseEntryAvgAggregateInputType
    _sum?: ExpenseEntrySumAggregateInputType
    _min?: ExpenseEntryMinAggregateInputType
    _max?: ExpenseEntryMaxAggregateInputType
  }

  export type ExpenseEntryGroupByOutputType = {
    id: number
    uuid: string
    user_uuid: string
    type: $Enums.ExpenseEntryType
    amount: Decimal
    description: string | null
    from_account_uuid: string
    to_account_uuid: string | null
    category_uuid: string
    subcategory_uuid: string
    entry_date: Date
    created_at: Date
    updated_at: Date
    _count: ExpenseEntryCountAggregateOutputType | null
    _avg: ExpenseEntryAvgAggregateOutputType | null
    _sum: ExpenseEntrySumAggregateOutputType | null
    _min: ExpenseEntryMinAggregateOutputType | null
    _max: ExpenseEntryMaxAggregateOutputType | null
  }

  type GetExpenseEntryGroupByPayload<T extends ExpenseEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExpenseEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExpenseEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExpenseEntryGroupByOutputType[P]>
            : GetScalarType<T[P], ExpenseEntryGroupByOutputType[P]>
        }
      >
    >


  export type ExpenseEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    from_account_uuid?: boolean
    to_account_uuid?: boolean
    category_uuid?: boolean
    subcategory_uuid?: boolean
    entry_date?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    from_account?: boolean | ExpenseAccountDefaultArgs<ExtArgs>
    to_account?: boolean | ExpenseEntry$to_accountArgs<ExtArgs>
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
    subcategory?: boolean | ExpenseSubcategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expenseEntry"]>

  export type ExpenseEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    from_account_uuid?: boolean
    to_account_uuid?: boolean
    category_uuid?: boolean
    subcategory_uuid?: boolean
    entry_date?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    from_account?: boolean | ExpenseAccountDefaultArgs<ExtArgs>
    to_account?: boolean | ExpenseEntry$to_accountArgs<ExtArgs>
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
    subcategory?: boolean | ExpenseSubcategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expenseEntry"]>

  export type ExpenseEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    from_account_uuid?: boolean
    to_account_uuid?: boolean
    category_uuid?: boolean
    subcategory_uuid?: boolean
    entry_date?: boolean
    created_at?: boolean
    updated_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    from_account?: boolean | ExpenseAccountDefaultArgs<ExtArgs>
    to_account?: boolean | ExpenseEntry$to_accountArgs<ExtArgs>
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
    subcategory?: boolean | ExpenseSubcategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["expenseEntry"]>

  export type ExpenseEntrySelectScalar = {
    id?: boolean
    uuid?: boolean
    user_uuid?: boolean
    type?: boolean
    amount?: boolean
    description?: boolean
    from_account_uuid?: boolean
    to_account_uuid?: boolean
    category_uuid?: boolean
    subcategory_uuid?: boolean
    entry_date?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type ExpenseEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "uuid" | "user_uuid" | "type" | "amount" | "description" | "from_account_uuid" | "to_account_uuid" | "category_uuid" | "subcategory_uuid" | "entry_date" | "created_at" | "updated_at", ExtArgs["result"]["expenseEntry"]>
  export type ExpenseEntryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    from_account?: boolean | ExpenseAccountDefaultArgs<ExtArgs>
    to_account?: boolean | ExpenseEntry$to_accountArgs<ExtArgs>
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
    subcategory?: boolean | ExpenseSubcategoryDefaultArgs<ExtArgs>
  }
  export type ExpenseEntryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    from_account?: boolean | ExpenseAccountDefaultArgs<ExtArgs>
    to_account?: boolean | ExpenseEntry$to_accountArgs<ExtArgs>
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
    subcategory?: boolean | ExpenseSubcategoryDefaultArgs<ExtArgs>
  }
  export type ExpenseEntryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    from_account?: boolean | ExpenseAccountDefaultArgs<ExtArgs>
    to_account?: boolean | ExpenseEntry$to_accountArgs<ExtArgs>
    category?: boolean | ExpenseCategoryDefaultArgs<ExtArgs>
    subcategory?: boolean | ExpenseSubcategoryDefaultArgs<ExtArgs>
  }

  export type $ExpenseEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExpenseEntry"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      from_account: Prisma.$ExpenseAccountPayload<ExtArgs>
      to_account: Prisma.$ExpenseAccountPayload<ExtArgs> | null
      category: Prisma.$ExpenseCategoryPayload<ExtArgs>
      subcategory: Prisma.$ExpenseSubcategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      uuid: string
      user_uuid: string
      type: $Enums.ExpenseEntryType
      amount: Prisma.Decimal
      description: string | null
      from_account_uuid: string
      to_account_uuid: string | null
      category_uuid: string
      subcategory_uuid: string
      entry_date: Date
      created_at: Date
      updated_at: Date
    }, ExtArgs["result"]["expenseEntry"]>
    composites: {}
  }

  type ExpenseEntryGetPayload<S extends boolean | null | undefined | ExpenseEntryDefaultArgs> = $Result.GetResult<Prisma.$ExpenseEntryPayload, S>

  type ExpenseEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExpenseEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExpenseEntryCountAggregateInputType | true
    }

  export interface ExpenseEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExpenseEntry'], meta: { name: 'ExpenseEntry' } }
    /**
     * Find zero or one ExpenseEntry that matches the filter.
     * @param {ExpenseEntryFindUniqueArgs} args - Arguments to find a ExpenseEntry
     * @example
     * // Get one ExpenseEntry
     * const expenseEntry = await prisma.expenseEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExpenseEntryFindUniqueArgs>(args: SelectSubset<T, ExpenseEntryFindUniqueArgs<ExtArgs>>): Prisma__ExpenseEntryClient<$Result.GetResult<Prisma.$ExpenseEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExpenseEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExpenseEntryFindUniqueOrThrowArgs} args - Arguments to find a ExpenseEntry
     * @example
     * // Get one ExpenseEntry
     * const expenseEntry = await prisma.expenseEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExpenseEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, ExpenseEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExpenseEntryClient<$Result.GetResult<Prisma.$ExpenseEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExpenseEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseEntryFindFirstArgs} args - Arguments to find a ExpenseEntry
     * @example
     * // Get one ExpenseEntry
     * const expenseEntry = await prisma.expenseEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExpenseEntryFindFirstArgs>(args?: SelectSubset<T, ExpenseEntryFindFirstArgs<ExtArgs>>): Prisma__ExpenseEntryClient<$Result.GetResult<Prisma.$ExpenseEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExpenseEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseEntryFindFirstOrThrowArgs} args - Arguments to find a ExpenseEntry
     * @example
     * // Get one ExpenseEntry
     * const expenseEntry = await prisma.expenseEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExpenseEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, ExpenseEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExpenseEntryClient<$Result.GetResult<Prisma.$ExpenseEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExpenseEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExpenseEntries
     * const expenseEntries = await prisma.expenseEntry.findMany()
     * 
     * // Get first 10 ExpenseEntries
     * const expenseEntries = await prisma.expenseEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const expenseEntryWithIdOnly = await prisma.expenseEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExpenseEntryFindManyArgs>(args?: SelectSubset<T, ExpenseEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExpenseEntry.
     * @param {ExpenseEntryCreateArgs} args - Arguments to create a ExpenseEntry.
     * @example
     * // Create one ExpenseEntry
     * const ExpenseEntry = await prisma.expenseEntry.create({
     *   data: {
     *     // ... data to create a ExpenseEntry
     *   }
     * })
     * 
     */
    create<T extends ExpenseEntryCreateArgs>(args: SelectSubset<T, ExpenseEntryCreateArgs<ExtArgs>>): Prisma__ExpenseEntryClient<$Result.GetResult<Prisma.$ExpenseEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExpenseEntries.
     * @param {ExpenseEntryCreateManyArgs} args - Arguments to create many ExpenseEntries.
     * @example
     * // Create many ExpenseEntries
     * const expenseEntry = await prisma.expenseEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExpenseEntryCreateManyArgs>(args?: SelectSubset<T, ExpenseEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExpenseEntries and returns the data saved in the database.
     * @param {ExpenseEntryCreateManyAndReturnArgs} args - Arguments to create many ExpenseEntries.
     * @example
     * // Create many ExpenseEntries
     * const expenseEntry = await prisma.expenseEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExpenseEntries and only return the `id`
     * const expenseEntryWithIdOnly = await prisma.expenseEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExpenseEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, ExpenseEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExpenseEntry.
     * @param {ExpenseEntryDeleteArgs} args - Arguments to delete one ExpenseEntry.
     * @example
     * // Delete one ExpenseEntry
     * const ExpenseEntry = await prisma.expenseEntry.delete({
     *   where: {
     *     // ... filter to delete one ExpenseEntry
     *   }
     * })
     * 
     */
    delete<T extends ExpenseEntryDeleteArgs>(args: SelectSubset<T, ExpenseEntryDeleteArgs<ExtArgs>>): Prisma__ExpenseEntryClient<$Result.GetResult<Prisma.$ExpenseEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExpenseEntry.
     * @param {ExpenseEntryUpdateArgs} args - Arguments to update one ExpenseEntry.
     * @example
     * // Update one ExpenseEntry
     * const expenseEntry = await prisma.expenseEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExpenseEntryUpdateArgs>(args: SelectSubset<T, ExpenseEntryUpdateArgs<ExtArgs>>): Prisma__ExpenseEntryClient<$Result.GetResult<Prisma.$ExpenseEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExpenseEntries.
     * @param {ExpenseEntryDeleteManyArgs} args - Arguments to filter ExpenseEntries to delete.
     * @example
     * // Delete a few ExpenseEntries
     * const { count } = await prisma.expenseEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExpenseEntryDeleteManyArgs>(args?: SelectSubset<T, ExpenseEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExpenseEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExpenseEntries
     * const expenseEntry = await prisma.expenseEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExpenseEntryUpdateManyArgs>(args: SelectSubset<T, ExpenseEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExpenseEntries and returns the data updated in the database.
     * @param {ExpenseEntryUpdateManyAndReturnArgs} args - Arguments to update many ExpenseEntries.
     * @example
     * // Update many ExpenseEntries
     * const expenseEntry = await prisma.expenseEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExpenseEntries and only return the `id`
     * const expenseEntryWithIdOnly = await prisma.expenseEntry.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExpenseEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, ExpenseEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExpenseEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExpenseEntry.
     * @param {ExpenseEntryUpsertArgs} args - Arguments to update or create a ExpenseEntry.
     * @example
     * // Update or create a ExpenseEntry
     * const expenseEntry = await prisma.expenseEntry.upsert({
     *   create: {
     *     // ... data to create a ExpenseEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExpenseEntry we want to update
     *   }
     * })
     */
    upsert<T extends ExpenseEntryUpsertArgs>(args: SelectSubset<T, ExpenseEntryUpsertArgs<ExtArgs>>): Prisma__ExpenseEntryClient<$Result.GetResult<Prisma.$ExpenseEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExpenseEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseEntryCountArgs} args - Arguments to filter ExpenseEntries to count.
     * @example
     * // Count the number of ExpenseEntries
     * const count = await prisma.expenseEntry.count({
     *   where: {
     *     // ... the filter for the ExpenseEntries we want to count
     *   }
     * })
    **/
    count<T extends ExpenseEntryCountArgs>(
      args?: Subset<T, ExpenseEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExpenseEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExpenseEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExpenseEntryAggregateArgs>(args: Subset<T, ExpenseEntryAggregateArgs>): Prisma.PrismaPromise<GetExpenseEntryAggregateType<T>>

    /**
     * Group by ExpenseEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExpenseEntryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExpenseEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExpenseEntryGroupByArgs['orderBy'] }
        : { orderBy?: ExpenseEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExpenseEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExpenseEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExpenseEntry model
   */
  readonly fields: ExpenseEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExpenseEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExpenseEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    from_account<T extends ExpenseAccountDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExpenseAccountDefaultArgs<ExtArgs>>): Prisma__ExpenseAccountClient<$Result.GetResult<Prisma.$ExpenseAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    to_account<T extends ExpenseEntry$to_accountArgs<ExtArgs> = {}>(args?: Subset<T, ExpenseEntry$to_accountArgs<ExtArgs>>): Prisma__ExpenseAccountClient<$Result.GetResult<Prisma.$ExpenseAccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    category<T extends ExpenseCategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExpenseCategoryDefaultArgs<ExtArgs>>): Prisma__ExpenseCategoryClient<$Result.GetResult<Prisma.$ExpenseCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subcategory<T extends ExpenseSubcategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ExpenseSubcategoryDefaultArgs<ExtArgs>>): Prisma__ExpenseSubcategoryClient<$Result.GetResult<Prisma.$ExpenseSubcategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExpenseEntry model
   */
  interface ExpenseEntryFieldRefs {
    readonly id: FieldRef<"ExpenseEntry", 'Int'>
    readonly uuid: FieldRef<"ExpenseEntry", 'String'>
    readonly user_uuid: FieldRef<"ExpenseEntry", 'String'>
    readonly type: FieldRef<"ExpenseEntry", 'ExpenseEntryType'>
    readonly amount: FieldRef<"ExpenseEntry", 'Decimal'>
    readonly description: FieldRef<"ExpenseEntry", 'String'>
    readonly from_account_uuid: FieldRef<"ExpenseEntry", 'String'>
    readonly to_account_uuid: FieldRef<"ExpenseEntry", 'String'>
    readonly category_uuid: FieldRef<"ExpenseEntry", 'String'>
    readonly subcategory_uuid: FieldRef<"ExpenseEntry", 'String'>
    readonly entry_date: FieldRef<"ExpenseEntry", 'DateTime'>
    readonly created_at: FieldRef<"ExpenseEntry", 'DateTime'>
    readonly updated_at: FieldRef<"ExpenseEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExpenseEntry findUnique
   */
  export type ExpenseEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseEntry
     */
    select?: ExpenseEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseEntry
     */
    omit?: ExpenseEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseEntryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseEntry to fetch.
     */
    where: ExpenseEntryWhereUniqueInput
  }

  /**
   * ExpenseEntry findUniqueOrThrow
   */
  export type ExpenseEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseEntry
     */
    select?: ExpenseEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseEntry
     */
    omit?: ExpenseEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseEntryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseEntry to fetch.
     */
    where: ExpenseEntryWhereUniqueInput
  }

  /**
   * ExpenseEntry findFirst
   */
  export type ExpenseEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseEntry
     */
    select?: ExpenseEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseEntry
     */
    omit?: ExpenseEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseEntryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseEntry to fetch.
     */
    where?: ExpenseEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseEntries to fetch.
     */
    orderBy?: ExpenseEntryOrderByWithRelationInput | ExpenseEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExpenseEntries.
     */
    cursor?: ExpenseEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExpenseEntries.
     */
    distinct?: ExpenseEntryScalarFieldEnum | ExpenseEntryScalarFieldEnum[]
  }

  /**
   * ExpenseEntry findFirstOrThrow
   */
  export type ExpenseEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseEntry
     */
    select?: ExpenseEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseEntry
     */
    omit?: ExpenseEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseEntryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseEntry to fetch.
     */
    where?: ExpenseEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseEntries to fetch.
     */
    orderBy?: ExpenseEntryOrderByWithRelationInput | ExpenseEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExpenseEntries.
     */
    cursor?: ExpenseEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExpenseEntries.
     */
    distinct?: ExpenseEntryScalarFieldEnum | ExpenseEntryScalarFieldEnum[]
  }

  /**
   * ExpenseEntry findMany
   */
  export type ExpenseEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseEntry
     */
    select?: ExpenseEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseEntry
     */
    omit?: ExpenseEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseEntryInclude<ExtArgs> | null
    /**
     * Filter, which ExpenseEntries to fetch.
     */
    where?: ExpenseEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExpenseEntries to fetch.
     */
    orderBy?: ExpenseEntryOrderByWithRelationInput | ExpenseEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExpenseEntries.
     */
    cursor?: ExpenseEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExpenseEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExpenseEntries.
     */
    skip?: number
    distinct?: ExpenseEntryScalarFieldEnum | ExpenseEntryScalarFieldEnum[]
  }

  /**
   * ExpenseEntry create
   */
  export type ExpenseEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseEntry
     */
    select?: ExpenseEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseEntry
     */
    omit?: ExpenseEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseEntryInclude<ExtArgs> | null
    /**
     * The data needed to create a ExpenseEntry.
     */
    data: XOR<ExpenseEntryCreateInput, ExpenseEntryUncheckedCreateInput>
  }

  /**
   * ExpenseEntry createMany
   */
  export type ExpenseEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExpenseEntries.
     */
    data: ExpenseEntryCreateManyInput | ExpenseEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExpenseEntry createManyAndReturn
   */
  export type ExpenseEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseEntry
     */
    select?: ExpenseEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseEntry
     */
    omit?: ExpenseEntryOmit<ExtArgs> | null
    /**
     * The data used to create many ExpenseEntries.
     */
    data: ExpenseEntryCreateManyInput | ExpenseEntryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseEntryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExpenseEntry update
   */
  export type ExpenseEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseEntry
     */
    select?: ExpenseEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseEntry
     */
    omit?: ExpenseEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseEntryInclude<ExtArgs> | null
    /**
     * The data needed to update a ExpenseEntry.
     */
    data: XOR<ExpenseEntryUpdateInput, ExpenseEntryUncheckedUpdateInput>
    /**
     * Choose, which ExpenseEntry to update.
     */
    where: ExpenseEntryWhereUniqueInput
  }

  /**
   * ExpenseEntry updateMany
   */
  export type ExpenseEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExpenseEntries.
     */
    data: XOR<ExpenseEntryUpdateManyMutationInput, ExpenseEntryUncheckedUpdateManyInput>
    /**
     * Filter which ExpenseEntries to update
     */
    where?: ExpenseEntryWhereInput
    /**
     * Limit how many ExpenseEntries to update.
     */
    limit?: number
  }

  /**
   * ExpenseEntry updateManyAndReturn
   */
  export type ExpenseEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseEntry
     */
    select?: ExpenseEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseEntry
     */
    omit?: ExpenseEntryOmit<ExtArgs> | null
    /**
     * The data used to update ExpenseEntries.
     */
    data: XOR<ExpenseEntryUpdateManyMutationInput, ExpenseEntryUncheckedUpdateManyInput>
    /**
     * Filter which ExpenseEntries to update
     */
    where?: ExpenseEntryWhereInput
    /**
     * Limit how many ExpenseEntries to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseEntryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ExpenseEntry upsert
   */
  export type ExpenseEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseEntry
     */
    select?: ExpenseEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseEntry
     */
    omit?: ExpenseEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseEntryInclude<ExtArgs> | null
    /**
     * The filter to search for the ExpenseEntry to update in case it exists.
     */
    where: ExpenseEntryWhereUniqueInput
    /**
     * In case the ExpenseEntry found by the `where` argument doesn't exist, create a new ExpenseEntry with this data.
     */
    create: XOR<ExpenseEntryCreateInput, ExpenseEntryUncheckedCreateInput>
    /**
     * In case the ExpenseEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExpenseEntryUpdateInput, ExpenseEntryUncheckedUpdateInput>
  }

  /**
   * ExpenseEntry delete
   */
  export type ExpenseEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseEntry
     */
    select?: ExpenseEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseEntry
     */
    omit?: ExpenseEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseEntryInclude<ExtArgs> | null
    /**
     * Filter which ExpenseEntry to delete.
     */
    where: ExpenseEntryWhereUniqueInput
  }

  /**
   * ExpenseEntry deleteMany
   */
  export type ExpenseEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExpenseEntries to delete
     */
    where?: ExpenseEntryWhereInput
    /**
     * Limit how many ExpenseEntries to delete.
     */
    limit?: number
  }

  /**
   * ExpenseEntry.to_account
   */
  export type ExpenseEntry$to_accountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseAccount
     */
    select?: ExpenseAccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseAccount
     */
    omit?: ExpenseAccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseAccountInclude<ExtArgs> | null
    where?: ExpenseAccountWhereInput
  }

  /**
   * ExpenseEntry without action
   */
  export type ExpenseEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExpenseEntry
     */
    select?: ExpenseEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExpenseEntry
     */
    omit?: ExpenseEntryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExpenseEntryInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    uuid: 'uuid',
    email: 'email',
    phone: 'phone',
    password: 'password',
    first_name: 'first_name',
    last_name: 'last_name',
    role: 'role',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ActivityScalarFieldEnum: {
    id: 'id',
    uuid: 'uuid',
    user_uuid: 'user_uuid',
    name: 'name',
    color: 'color',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ActivityScalarFieldEnum = (typeof ActivityScalarFieldEnum)[keyof typeof ActivityScalarFieldEnum]


  export const ScheduleSlotScalarFieldEnum: {
    id: 'id',
    uuid: 'uuid',
    user_uuid: 'user_uuid',
    activity_uuid: 'activity_uuid',
    day: 'day',
    start_time: 'start_time',
    end_time: 'end_time',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ScheduleSlotScalarFieldEnum = (typeof ScheduleSlotScalarFieldEnum)[keyof typeof ScheduleSlotScalarFieldEnum]


  export const ExpenseAccountScalarFieldEnum: {
    id: 'id',
    uuid: 'uuid',
    user_uuid: 'user_uuid',
    name: 'name',
    icon: 'icon',
    color: 'color',
    balance: 'balance',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ExpenseAccountScalarFieldEnum = (typeof ExpenseAccountScalarFieldEnum)[keyof typeof ExpenseAccountScalarFieldEnum]


  export const ExpenseCategoryScalarFieldEnum: {
    id: 'id',
    uuid: 'uuid',
    user_uuid: 'user_uuid',
    name: 'name',
    icon: 'icon',
    color: 'color',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ExpenseCategoryScalarFieldEnum = (typeof ExpenseCategoryScalarFieldEnum)[keyof typeof ExpenseCategoryScalarFieldEnum]


  export const ExpenseSubcategoryScalarFieldEnum: {
    id: 'id',
    uuid: 'uuid',
    user_uuid: 'user_uuid',
    category_uuid: 'category_uuid',
    name: 'name',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ExpenseSubcategoryScalarFieldEnum = (typeof ExpenseSubcategoryScalarFieldEnum)[keyof typeof ExpenseSubcategoryScalarFieldEnum]


  export const ExpenseEntryScalarFieldEnum: {
    id: 'id',
    uuid: 'uuid',
    user_uuid: 'user_uuid',
    type: 'type',
    amount: 'amount',
    description: 'description',
    from_account_uuid: 'from_account_uuid',
    to_account_uuid: 'to_account_uuid',
    category_uuid: 'category_uuid',
    subcategory_uuid: 'subcategory_uuid',
    entry_date: 'entry_date',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type ExpenseEntryScalarFieldEnum = (typeof ExpenseEntryScalarFieldEnum)[keyof typeof ExpenseEntryScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'AuthRole'
   */
  export type EnumAuthRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthRole'>
    


  /**
   * Reference to a field of type 'AuthRole[]'
   */
  export type ListEnumAuthRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthRole[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'ScheduleDay'
   */
  export type EnumScheduleDayFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ScheduleDay'>
    


  /**
   * Reference to a field of type 'ScheduleDay[]'
   */
  export type ListEnumScheduleDayFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ScheduleDay[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'ExpenseEntryType'
   */
  export type EnumExpenseEntryTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExpenseEntryType'>
    


  /**
   * Reference to a field of type 'ExpenseEntryType[]'
   */
  export type ListEnumExpenseEntryTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ExpenseEntryType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    uuid?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    first_name?: StringFilter<"User"> | string
    last_name?: StringFilter<"User"> | string
    role?: EnumAuthRoleFilter<"User"> | $Enums.AuthRole
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    activities?: ActivityListRelationFilter
    schedule_slots?: ScheduleSlotListRelationFilter
    expense_accounts?: ExpenseAccountListRelationFilter
    expense_entries?: ExpenseEntryListRelationFilter
    categories?: ExpenseCategoryListRelationFilter
    subcategories?: ExpenseSubcategoryListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    uuid?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    password?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    activities?: ActivityOrderByRelationAggregateInput
    schedule_slots?: ScheduleSlotOrderByRelationAggregateInput
    expense_accounts?: ExpenseAccountOrderByRelationAggregateInput
    expense_entries?: ExpenseEntryOrderByRelationAggregateInput
    categories?: ExpenseCategoryOrderByRelationAggregateInput
    subcategories?: ExpenseSubcategoryOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uuid?: string
    email?: string
    phone?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    first_name?: StringFilter<"User"> | string
    last_name?: StringFilter<"User"> | string
    role?: EnumAuthRoleFilter<"User"> | $Enums.AuthRole
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    activities?: ActivityListRelationFilter
    schedule_slots?: ScheduleSlotListRelationFilter
    expense_accounts?: ExpenseAccountListRelationFilter
    expense_entries?: ExpenseEntryListRelationFilter
    categories?: ExpenseCategoryListRelationFilter
    subcategories?: ExpenseSubcategoryListRelationFilter
  }, "id" | "uuid" | "email" | "phone">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    uuid?: SortOrder
    email?: SortOrder
    phone?: SortOrderInput | SortOrder
    password?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    uuid?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    password?: StringWithAggregatesFilter<"User"> | string
    first_name?: StringWithAggregatesFilter<"User"> | string
    last_name?: StringWithAggregatesFilter<"User"> | string
    role?: EnumAuthRoleWithAggregatesFilter<"User"> | $Enums.AuthRole
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ActivityWhereInput = {
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    id?: IntFilter<"Activity"> | number
    uuid?: StringFilter<"Activity"> | string
    user_uuid?: StringFilter<"Activity"> | string
    name?: StringFilter<"Activity"> | string
    color?: StringFilter<"Activity"> | string
    created_at?: DateTimeFilter<"Activity"> | Date | string
    updated_at?: DateTimeFilter<"Activity"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    schedule_slots?: ScheduleSlotListRelationFilter
  }

  export type ActivityOrderByWithRelationInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    name?: SortOrder
    color?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
    schedule_slots?: ScheduleSlotOrderByRelationAggregateInput
  }

  export type ActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uuid?: string
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    user_uuid?: StringFilter<"Activity"> | string
    name?: StringFilter<"Activity"> | string
    color?: StringFilter<"Activity"> | string
    created_at?: DateTimeFilter<"Activity"> | Date | string
    updated_at?: DateTimeFilter<"Activity"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    schedule_slots?: ScheduleSlotListRelationFilter
  }, "id" | "uuid">

  export type ActivityOrderByWithAggregationInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    name?: SortOrder
    color?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ActivityCountOrderByAggregateInput
    _avg?: ActivityAvgOrderByAggregateInput
    _max?: ActivityMaxOrderByAggregateInput
    _min?: ActivityMinOrderByAggregateInput
    _sum?: ActivitySumOrderByAggregateInput
  }

  export type ActivityScalarWhereWithAggregatesInput = {
    AND?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    OR?: ActivityScalarWhereWithAggregatesInput[]
    NOT?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Activity"> | number
    uuid?: StringWithAggregatesFilter<"Activity"> | string
    user_uuid?: StringWithAggregatesFilter<"Activity"> | string
    name?: StringWithAggregatesFilter<"Activity"> | string
    color?: StringWithAggregatesFilter<"Activity"> | string
    created_at?: DateTimeWithAggregatesFilter<"Activity"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Activity"> | Date | string
  }

  export type ScheduleSlotWhereInput = {
    AND?: ScheduleSlotWhereInput | ScheduleSlotWhereInput[]
    OR?: ScheduleSlotWhereInput[]
    NOT?: ScheduleSlotWhereInput | ScheduleSlotWhereInput[]
    id?: IntFilter<"ScheduleSlot"> | number
    uuid?: StringFilter<"ScheduleSlot"> | string
    user_uuid?: StringFilter<"ScheduleSlot"> | string
    activity_uuid?: StringFilter<"ScheduleSlot"> | string
    day?: EnumScheduleDayFilter<"ScheduleSlot"> | $Enums.ScheduleDay
    start_time?: StringFilter<"ScheduleSlot"> | string
    end_time?: StringFilter<"ScheduleSlot"> | string
    created_at?: DateTimeFilter<"ScheduleSlot"> | Date | string
    updated_at?: DateTimeFilter<"ScheduleSlot"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    activity?: XOR<ActivityScalarRelationFilter, ActivityWhereInput>
  }

  export type ScheduleSlotOrderByWithRelationInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    activity_uuid?: SortOrder
    day?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
    activity?: ActivityOrderByWithRelationInput
  }

  export type ScheduleSlotWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uuid?: string
    AND?: ScheduleSlotWhereInput | ScheduleSlotWhereInput[]
    OR?: ScheduleSlotWhereInput[]
    NOT?: ScheduleSlotWhereInput | ScheduleSlotWhereInput[]
    user_uuid?: StringFilter<"ScheduleSlot"> | string
    activity_uuid?: StringFilter<"ScheduleSlot"> | string
    day?: EnumScheduleDayFilter<"ScheduleSlot"> | $Enums.ScheduleDay
    start_time?: StringFilter<"ScheduleSlot"> | string
    end_time?: StringFilter<"ScheduleSlot"> | string
    created_at?: DateTimeFilter<"ScheduleSlot"> | Date | string
    updated_at?: DateTimeFilter<"ScheduleSlot"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    activity?: XOR<ActivityScalarRelationFilter, ActivityWhereInput>
  }, "id" | "uuid">

  export type ScheduleSlotOrderByWithAggregationInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    activity_uuid?: SortOrder
    day?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ScheduleSlotCountOrderByAggregateInput
    _avg?: ScheduleSlotAvgOrderByAggregateInput
    _max?: ScheduleSlotMaxOrderByAggregateInput
    _min?: ScheduleSlotMinOrderByAggregateInput
    _sum?: ScheduleSlotSumOrderByAggregateInput
  }

  export type ScheduleSlotScalarWhereWithAggregatesInput = {
    AND?: ScheduleSlotScalarWhereWithAggregatesInput | ScheduleSlotScalarWhereWithAggregatesInput[]
    OR?: ScheduleSlotScalarWhereWithAggregatesInput[]
    NOT?: ScheduleSlotScalarWhereWithAggregatesInput | ScheduleSlotScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ScheduleSlot"> | number
    uuid?: StringWithAggregatesFilter<"ScheduleSlot"> | string
    user_uuid?: StringWithAggregatesFilter<"ScheduleSlot"> | string
    activity_uuid?: StringWithAggregatesFilter<"ScheduleSlot"> | string
    day?: EnumScheduleDayWithAggregatesFilter<"ScheduleSlot"> | $Enums.ScheduleDay
    start_time?: StringWithAggregatesFilter<"ScheduleSlot"> | string
    end_time?: StringWithAggregatesFilter<"ScheduleSlot"> | string
    created_at?: DateTimeWithAggregatesFilter<"ScheduleSlot"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ScheduleSlot"> | Date | string
  }

  export type ExpenseAccountWhereInput = {
    AND?: ExpenseAccountWhereInput | ExpenseAccountWhereInput[]
    OR?: ExpenseAccountWhereInput[]
    NOT?: ExpenseAccountWhereInput | ExpenseAccountWhereInput[]
    id?: IntFilter<"ExpenseAccount"> | number
    uuid?: StringFilter<"ExpenseAccount"> | string
    user_uuid?: StringFilter<"ExpenseAccount"> | string
    name?: StringFilter<"ExpenseAccount"> | string
    icon?: StringNullableFilter<"ExpenseAccount"> | string | null
    color?: StringNullableFilter<"ExpenseAccount"> | string | null
    balance?: DecimalFilter<"ExpenseAccount"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFilter<"ExpenseAccount"> | Date | string
    updated_at?: DateTimeFilter<"ExpenseAccount"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    entries_from?: ExpenseEntryListRelationFilter
    entries_to?: ExpenseEntryListRelationFilter
  }

  export type ExpenseAccountOrderByWithRelationInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    name?: SortOrder
    icon?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    balance?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
    entries_from?: ExpenseEntryOrderByRelationAggregateInput
    entries_to?: ExpenseEntryOrderByRelationAggregateInput
  }

  export type ExpenseAccountWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uuid?: string
    AND?: ExpenseAccountWhereInput | ExpenseAccountWhereInput[]
    OR?: ExpenseAccountWhereInput[]
    NOT?: ExpenseAccountWhereInput | ExpenseAccountWhereInput[]
    user_uuid?: StringFilter<"ExpenseAccount"> | string
    name?: StringFilter<"ExpenseAccount"> | string
    icon?: StringNullableFilter<"ExpenseAccount"> | string | null
    color?: StringNullableFilter<"ExpenseAccount"> | string | null
    balance?: DecimalFilter<"ExpenseAccount"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFilter<"ExpenseAccount"> | Date | string
    updated_at?: DateTimeFilter<"ExpenseAccount"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    entries_from?: ExpenseEntryListRelationFilter
    entries_to?: ExpenseEntryListRelationFilter
  }, "id" | "uuid">

  export type ExpenseAccountOrderByWithAggregationInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    name?: SortOrder
    icon?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    balance?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ExpenseAccountCountOrderByAggregateInput
    _avg?: ExpenseAccountAvgOrderByAggregateInput
    _max?: ExpenseAccountMaxOrderByAggregateInput
    _min?: ExpenseAccountMinOrderByAggregateInput
    _sum?: ExpenseAccountSumOrderByAggregateInput
  }

  export type ExpenseAccountScalarWhereWithAggregatesInput = {
    AND?: ExpenseAccountScalarWhereWithAggregatesInput | ExpenseAccountScalarWhereWithAggregatesInput[]
    OR?: ExpenseAccountScalarWhereWithAggregatesInput[]
    NOT?: ExpenseAccountScalarWhereWithAggregatesInput | ExpenseAccountScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ExpenseAccount"> | number
    uuid?: StringWithAggregatesFilter<"ExpenseAccount"> | string
    user_uuid?: StringWithAggregatesFilter<"ExpenseAccount"> | string
    name?: StringWithAggregatesFilter<"ExpenseAccount"> | string
    icon?: StringNullableWithAggregatesFilter<"ExpenseAccount"> | string | null
    color?: StringNullableWithAggregatesFilter<"ExpenseAccount"> | string | null
    balance?: DecimalWithAggregatesFilter<"ExpenseAccount"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeWithAggregatesFilter<"ExpenseAccount"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ExpenseAccount"> | Date | string
  }

  export type ExpenseCategoryWhereInput = {
    AND?: ExpenseCategoryWhereInput | ExpenseCategoryWhereInput[]
    OR?: ExpenseCategoryWhereInput[]
    NOT?: ExpenseCategoryWhereInput | ExpenseCategoryWhereInput[]
    id?: IntFilter<"ExpenseCategory"> | number
    uuid?: StringFilter<"ExpenseCategory"> | string
    user_uuid?: StringNullableFilter<"ExpenseCategory"> | string | null
    name?: StringFilter<"ExpenseCategory"> | string
    icon?: StringNullableFilter<"ExpenseCategory"> | string | null
    color?: StringNullableFilter<"ExpenseCategory"> | string | null
    created_at?: DateTimeFilter<"ExpenseCategory"> | Date | string
    updated_at?: DateTimeFilter<"ExpenseCategory"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    subcategories?: ExpenseSubcategoryListRelationFilter
    entries?: ExpenseEntryListRelationFilter
  }

  export type ExpenseCategoryOrderByWithRelationInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrderInput | SortOrder
    name?: SortOrder
    icon?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
    subcategories?: ExpenseSubcategoryOrderByRelationAggregateInput
    entries?: ExpenseEntryOrderByRelationAggregateInput
  }

  export type ExpenseCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uuid?: string
    AND?: ExpenseCategoryWhereInput | ExpenseCategoryWhereInput[]
    OR?: ExpenseCategoryWhereInput[]
    NOT?: ExpenseCategoryWhereInput | ExpenseCategoryWhereInput[]
    user_uuid?: StringNullableFilter<"ExpenseCategory"> | string | null
    name?: StringFilter<"ExpenseCategory"> | string
    icon?: StringNullableFilter<"ExpenseCategory"> | string | null
    color?: StringNullableFilter<"ExpenseCategory"> | string | null
    created_at?: DateTimeFilter<"ExpenseCategory"> | Date | string
    updated_at?: DateTimeFilter<"ExpenseCategory"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    subcategories?: ExpenseSubcategoryListRelationFilter
    entries?: ExpenseEntryListRelationFilter
  }, "id" | "uuid">

  export type ExpenseCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrderInput | SortOrder
    name?: SortOrder
    icon?: SortOrderInput | SortOrder
    color?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ExpenseCategoryCountOrderByAggregateInput
    _avg?: ExpenseCategoryAvgOrderByAggregateInput
    _max?: ExpenseCategoryMaxOrderByAggregateInput
    _min?: ExpenseCategoryMinOrderByAggregateInput
    _sum?: ExpenseCategorySumOrderByAggregateInput
  }

  export type ExpenseCategoryScalarWhereWithAggregatesInput = {
    AND?: ExpenseCategoryScalarWhereWithAggregatesInput | ExpenseCategoryScalarWhereWithAggregatesInput[]
    OR?: ExpenseCategoryScalarWhereWithAggregatesInput[]
    NOT?: ExpenseCategoryScalarWhereWithAggregatesInput | ExpenseCategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ExpenseCategory"> | number
    uuid?: StringWithAggregatesFilter<"ExpenseCategory"> | string
    user_uuid?: StringNullableWithAggregatesFilter<"ExpenseCategory"> | string | null
    name?: StringWithAggregatesFilter<"ExpenseCategory"> | string
    icon?: StringNullableWithAggregatesFilter<"ExpenseCategory"> | string | null
    color?: StringNullableWithAggregatesFilter<"ExpenseCategory"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"ExpenseCategory"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ExpenseCategory"> | Date | string
  }

  export type ExpenseSubcategoryWhereInput = {
    AND?: ExpenseSubcategoryWhereInput | ExpenseSubcategoryWhereInput[]
    OR?: ExpenseSubcategoryWhereInput[]
    NOT?: ExpenseSubcategoryWhereInput | ExpenseSubcategoryWhereInput[]
    id?: IntFilter<"ExpenseSubcategory"> | number
    uuid?: StringFilter<"ExpenseSubcategory"> | string
    user_uuid?: StringNullableFilter<"ExpenseSubcategory"> | string | null
    category_uuid?: StringFilter<"ExpenseSubcategory"> | string
    name?: StringFilter<"ExpenseSubcategory"> | string
    created_at?: DateTimeFilter<"ExpenseSubcategory"> | Date | string
    updated_at?: DateTimeFilter<"ExpenseSubcategory"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    category?: XOR<ExpenseCategoryScalarRelationFilter, ExpenseCategoryWhereInput>
    entries?: ExpenseEntryListRelationFilter
  }

  export type ExpenseSubcategoryOrderByWithRelationInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrderInput | SortOrder
    category_uuid?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
    category?: ExpenseCategoryOrderByWithRelationInput
    entries?: ExpenseEntryOrderByRelationAggregateInput
  }

  export type ExpenseSubcategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uuid?: string
    AND?: ExpenseSubcategoryWhereInput | ExpenseSubcategoryWhereInput[]
    OR?: ExpenseSubcategoryWhereInput[]
    NOT?: ExpenseSubcategoryWhereInput | ExpenseSubcategoryWhereInput[]
    user_uuid?: StringNullableFilter<"ExpenseSubcategory"> | string | null
    category_uuid?: StringFilter<"ExpenseSubcategory"> | string
    name?: StringFilter<"ExpenseSubcategory"> | string
    created_at?: DateTimeFilter<"ExpenseSubcategory"> | Date | string
    updated_at?: DateTimeFilter<"ExpenseSubcategory"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    category?: XOR<ExpenseCategoryScalarRelationFilter, ExpenseCategoryWhereInput>
    entries?: ExpenseEntryListRelationFilter
  }, "id" | "uuid">

  export type ExpenseSubcategoryOrderByWithAggregationInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrderInput | SortOrder
    category_uuid?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ExpenseSubcategoryCountOrderByAggregateInput
    _avg?: ExpenseSubcategoryAvgOrderByAggregateInput
    _max?: ExpenseSubcategoryMaxOrderByAggregateInput
    _min?: ExpenseSubcategoryMinOrderByAggregateInput
    _sum?: ExpenseSubcategorySumOrderByAggregateInput
  }

  export type ExpenseSubcategoryScalarWhereWithAggregatesInput = {
    AND?: ExpenseSubcategoryScalarWhereWithAggregatesInput | ExpenseSubcategoryScalarWhereWithAggregatesInput[]
    OR?: ExpenseSubcategoryScalarWhereWithAggregatesInput[]
    NOT?: ExpenseSubcategoryScalarWhereWithAggregatesInput | ExpenseSubcategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ExpenseSubcategory"> | number
    uuid?: StringWithAggregatesFilter<"ExpenseSubcategory"> | string
    user_uuid?: StringNullableWithAggregatesFilter<"ExpenseSubcategory"> | string | null
    category_uuid?: StringWithAggregatesFilter<"ExpenseSubcategory"> | string
    name?: StringWithAggregatesFilter<"ExpenseSubcategory"> | string
    created_at?: DateTimeWithAggregatesFilter<"ExpenseSubcategory"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ExpenseSubcategory"> | Date | string
  }

  export type ExpenseEntryWhereInput = {
    AND?: ExpenseEntryWhereInput | ExpenseEntryWhereInput[]
    OR?: ExpenseEntryWhereInput[]
    NOT?: ExpenseEntryWhereInput | ExpenseEntryWhereInput[]
    id?: IntFilter<"ExpenseEntry"> | number
    uuid?: StringFilter<"ExpenseEntry"> | string
    user_uuid?: StringFilter<"ExpenseEntry"> | string
    type?: EnumExpenseEntryTypeFilter<"ExpenseEntry"> | $Enums.ExpenseEntryType
    amount?: DecimalFilter<"ExpenseEntry"> | Decimal | DecimalJsLike | number | string
    description?: StringNullableFilter<"ExpenseEntry"> | string | null
    from_account_uuid?: StringFilter<"ExpenseEntry"> | string
    to_account_uuid?: StringNullableFilter<"ExpenseEntry"> | string | null
    category_uuid?: StringFilter<"ExpenseEntry"> | string
    subcategory_uuid?: StringFilter<"ExpenseEntry"> | string
    entry_date?: DateTimeFilter<"ExpenseEntry"> | Date | string
    created_at?: DateTimeFilter<"ExpenseEntry"> | Date | string
    updated_at?: DateTimeFilter<"ExpenseEntry"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    from_account?: XOR<ExpenseAccountScalarRelationFilter, ExpenseAccountWhereInput>
    to_account?: XOR<ExpenseAccountNullableScalarRelationFilter, ExpenseAccountWhereInput> | null
    category?: XOR<ExpenseCategoryScalarRelationFilter, ExpenseCategoryWhereInput>
    subcategory?: XOR<ExpenseSubcategoryScalarRelationFilter, ExpenseSubcategoryWhereInput>
  }

  export type ExpenseEntryOrderByWithRelationInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrderInput | SortOrder
    from_account_uuid?: SortOrder
    to_account_uuid?: SortOrderInput | SortOrder
    category_uuid?: SortOrder
    subcategory_uuid?: SortOrder
    entry_date?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user?: UserOrderByWithRelationInput
    from_account?: ExpenseAccountOrderByWithRelationInput
    to_account?: ExpenseAccountOrderByWithRelationInput
    category?: ExpenseCategoryOrderByWithRelationInput
    subcategory?: ExpenseSubcategoryOrderByWithRelationInput
  }

  export type ExpenseEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    uuid?: string
    AND?: ExpenseEntryWhereInput | ExpenseEntryWhereInput[]
    OR?: ExpenseEntryWhereInput[]
    NOT?: ExpenseEntryWhereInput | ExpenseEntryWhereInput[]
    user_uuid?: StringFilter<"ExpenseEntry"> | string
    type?: EnumExpenseEntryTypeFilter<"ExpenseEntry"> | $Enums.ExpenseEntryType
    amount?: DecimalFilter<"ExpenseEntry"> | Decimal | DecimalJsLike | number | string
    description?: StringNullableFilter<"ExpenseEntry"> | string | null
    from_account_uuid?: StringFilter<"ExpenseEntry"> | string
    to_account_uuid?: StringNullableFilter<"ExpenseEntry"> | string | null
    category_uuid?: StringFilter<"ExpenseEntry"> | string
    subcategory_uuid?: StringFilter<"ExpenseEntry"> | string
    entry_date?: DateTimeFilter<"ExpenseEntry"> | Date | string
    created_at?: DateTimeFilter<"ExpenseEntry"> | Date | string
    updated_at?: DateTimeFilter<"ExpenseEntry"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    from_account?: XOR<ExpenseAccountScalarRelationFilter, ExpenseAccountWhereInput>
    to_account?: XOR<ExpenseAccountNullableScalarRelationFilter, ExpenseAccountWhereInput> | null
    category?: XOR<ExpenseCategoryScalarRelationFilter, ExpenseCategoryWhereInput>
    subcategory?: XOR<ExpenseSubcategoryScalarRelationFilter, ExpenseSubcategoryWhereInput>
  }, "id" | "uuid">

  export type ExpenseEntryOrderByWithAggregationInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrderInput | SortOrder
    from_account_uuid?: SortOrder
    to_account_uuid?: SortOrderInput | SortOrder
    category_uuid?: SortOrder
    subcategory_uuid?: SortOrder
    entry_date?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: ExpenseEntryCountOrderByAggregateInput
    _avg?: ExpenseEntryAvgOrderByAggregateInput
    _max?: ExpenseEntryMaxOrderByAggregateInput
    _min?: ExpenseEntryMinOrderByAggregateInput
    _sum?: ExpenseEntrySumOrderByAggregateInput
  }

  export type ExpenseEntryScalarWhereWithAggregatesInput = {
    AND?: ExpenseEntryScalarWhereWithAggregatesInput | ExpenseEntryScalarWhereWithAggregatesInput[]
    OR?: ExpenseEntryScalarWhereWithAggregatesInput[]
    NOT?: ExpenseEntryScalarWhereWithAggregatesInput | ExpenseEntryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ExpenseEntry"> | number
    uuid?: StringWithAggregatesFilter<"ExpenseEntry"> | string
    user_uuid?: StringWithAggregatesFilter<"ExpenseEntry"> | string
    type?: EnumExpenseEntryTypeWithAggregatesFilter<"ExpenseEntry"> | $Enums.ExpenseEntryType
    amount?: DecimalWithAggregatesFilter<"ExpenseEntry"> | Decimal | DecimalJsLike | number | string
    description?: StringNullableWithAggregatesFilter<"ExpenseEntry"> | string | null
    from_account_uuid?: StringWithAggregatesFilter<"ExpenseEntry"> | string
    to_account_uuid?: StringNullableWithAggregatesFilter<"ExpenseEntry"> | string | null
    category_uuid?: StringWithAggregatesFilter<"ExpenseEntry"> | string
    subcategory_uuid?: StringWithAggregatesFilter<"ExpenseEntry"> | string
    entry_date?: DateTimeWithAggregatesFilter<"ExpenseEntry"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"ExpenseEntry"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"ExpenseEntry"> | Date | string
  }

  export type UserCreateInput = {
    uuid?: string
    email: string
    phone?: string | null
    password: string
    first_name: string
    last_name: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    activities?: ActivityCreateNestedManyWithoutUserInput
    schedule_slots?: ScheduleSlotCreateNestedManyWithoutUserInput
    expense_accounts?: ExpenseAccountCreateNestedManyWithoutUserInput
    expense_entries?: ExpenseEntryCreateNestedManyWithoutUserInput
    categories?: ExpenseCategoryCreateNestedManyWithoutUserInput
    subcategories?: ExpenseSubcategoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    uuid?: string
    email: string
    phone?: string | null
    password: string
    first_name: string
    last_name: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    schedule_slots?: ScheduleSlotUncheckedCreateNestedManyWithoutUserInput
    expense_accounts?: ExpenseAccountUncheckedCreateNestedManyWithoutUserInput
    expense_entries?: ExpenseEntryUncheckedCreateNestedManyWithoutUserInput
    categories?: ExpenseCategoryUncheckedCreateNestedManyWithoutUserInput
    subcategories?: ExpenseSubcategoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUpdateManyWithoutUserNestedInput
    schedule_slots?: ScheduleSlotUpdateManyWithoutUserNestedInput
    expense_accounts?: ExpenseAccountUpdateManyWithoutUserNestedInput
    expense_entries?: ExpenseEntryUpdateManyWithoutUserNestedInput
    categories?: ExpenseCategoryUpdateManyWithoutUserNestedInput
    subcategories?: ExpenseSubcategoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    schedule_slots?: ScheduleSlotUncheckedUpdateManyWithoutUserNestedInput
    expense_accounts?: ExpenseAccountUncheckedUpdateManyWithoutUserNestedInput
    expense_entries?: ExpenseEntryUncheckedUpdateManyWithoutUserNestedInput
    categories?: ExpenseCategoryUncheckedUpdateManyWithoutUserNestedInput
    subcategories?: ExpenseSubcategoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    uuid?: string
    email: string
    phone?: string | null
    password: string
    first_name: string
    last_name: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityCreateInput = {
    uuid?: string
    name: string
    color: string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutActivitiesInput
    schedule_slots?: ScheduleSlotCreateNestedManyWithoutActivityInput
  }

  export type ActivityUncheckedCreateInput = {
    id?: number
    uuid?: string
    user_uuid: string
    name: string
    color: string
    created_at?: Date | string
    updated_at?: Date | string
    schedule_slots?: ScheduleSlotUncheckedCreateNestedManyWithoutActivityInput
  }

  export type ActivityUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutActivitiesNestedInput
    schedule_slots?: ScheduleSlotUpdateManyWithoutActivityNestedInput
  }

  export type ActivityUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    schedule_slots?: ScheduleSlotUncheckedUpdateManyWithoutActivityNestedInput
  }

  export type ActivityCreateManyInput = {
    id?: number
    uuid?: string
    user_uuid: string
    name: string
    color: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ActivityUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleSlotCreateInput = {
    uuid?: string
    day: $Enums.ScheduleDay
    start_time: string
    end_time: string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutSchedule_slotsInput
    activity: ActivityCreateNestedOneWithoutSchedule_slotsInput
  }

  export type ScheduleSlotUncheckedCreateInput = {
    id?: number
    uuid?: string
    user_uuid: string
    activity_uuid: string
    day: $Enums.ScheduleDay
    start_time: string
    end_time: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ScheduleSlotUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    day?: EnumScheduleDayFieldUpdateOperationsInput | $Enums.ScheduleDay
    start_time?: StringFieldUpdateOperationsInput | string
    end_time?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSchedule_slotsNestedInput
    activity?: ActivityUpdateOneRequiredWithoutSchedule_slotsNestedInput
  }

  export type ScheduleSlotUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    activity_uuid?: StringFieldUpdateOperationsInput | string
    day?: EnumScheduleDayFieldUpdateOperationsInput | $Enums.ScheduleDay
    start_time?: StringFieldUpdateOperationsInput | string
    end_time?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleSlotCreateManyInput = {
    id?: number
    uuid?: string
    user_uuid: string
    activity_uuid: string
    day: $Enums.ScheduleDay
    start_time: string
    end_time: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ScheduleSlotUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    day?: EnumScheduleDayFieldUpdateOperationsInput | $Enums.ScheduleDay
    start_time?: StringFieldUpdateOperationsInput | string
    end_time?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleSlotUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    activity_uuid?: StringFieldUpdateOperationsInput | string
    day?: EnumScheduleDayFieldUpdateOperationsInput | $Enums.ScheduleDay
    start_time?: StringFieldUpdateOperationsInput | string
    end_time?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseAccountCreateInput = {
    uuid?: string
    name: string
    icon?: string | null
    color?: string | null
    balance?: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutExpense_accountsInput
    entries_from?: ExpenseEntryCreateNestedManyWithoutFrom_accountInput
    entries_to?: ExpenseEntryCreateNestedManyWithoutTo_accountInput
  }

  export type ExpenseAccountUncheckedCreateInput = {
    id?: number
    uuid?: string
    user_uuid: string
    name: string
    icon?: string | null
    color?: string | null
    balance?: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    entries_from?: ExpenseEntryUncheckedCreateNestedManyWithoutFrom_accountInput
    entries_to?: ExpenseEntryUncheckedCreateNestedManyWithoutTo_accountInput
  }

  export type ExpenseAccountUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutExpense_accountsNestedInput
    entries_from?: ExpenseEntryUpdateManyWithoutFrom_accountNestedInput
    entries_to?: ExpenseEntryUpdateManyWithoutTo_accountNestedInput
  }

  export type ExpenseAccountUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    entries_from?: ExpenseEntryUncheckedUpdateManyWithoutFrom_accountNestedInput
    entries_to?: ExpenseEntryUncheckedUpdateManyWithoutTo_accountNestedInput
  }

  export type ExpenseAccountCreateManyInput = {
    id?: number
    uuid?: string
    user_uuid: string
    name: string
    icon?: string | null
    color?: string | null
    balance?: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ExpenseAccountUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseAccountUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseCategoryCreateInput = {
    uuid?: string
    name: string
    icon?: string | null
    color?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    user?: UserCreateNestedOneWithoutCategoriesInput
    subcategories?: ExpenseSubcategoryCreateNestedManyWithoutCategoryInput
    entries?: ExpenseEntryCreateNestedManyWithoutCategoryInput
  }

  export type ExpenseCategoryUncheckedCreateInput = {
    id?: number
    uuid?: string
    user_uuid?: string | null
    name: string
    icon?: string | null
    color?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    subcategories?: ExpenseSubcategoryUncheckedCreateNestedManyWithoutCategoryInput
    entries?: ExpenseEntryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type ExpenseCategoryUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutCategoriesNestedInput
    subcategories?: ExpenseSubcategoryUpdateManyWithoutCategoryNestedInput
    entries?: ExpenseEntryUpdateManyWithoutCategoryNestedInput
  }

  export type ExpenseCategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    subcategories?: ExpenseSubcategoryUncheckedUpdateManyWithoutCategoryNestedInput
    entries?: ExpenseEntryUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type ExpenseCategoryCreateManyInput = {
    id?: number
    uuid?: string
    user_uuid?: string | null
    name: string
    icon?: string | null
    color?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ExpenseCategoryUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseCategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseSubcategoryCreateInput = {
    uuid?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    user?: UserCreateNestedOneWithoutSubcategoriesInput
    category: ExpenseCategoryCreateNestedOneWithoutSubcategoriesInput
    entries?: ExpenseEntryCreateNestedManyWithoutSubcategoryInput
  }

  export type ExpenseSubcategoryUncheckedCreateInput = {
    id?: number
    uuid?: string
    user_uuid?: string | null
    category_uuid: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    entries?: ExpenseEntryUncheckedCreateNestedManyWithoutSubcategoryInput
  }

  export type ExpenseSubcategoryUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutSubcategoriesNestedInput
    category?: ExpenseCategoryUpdateOneRequiredWithoutSubcategoriesNestedInput
    entries?: ExpenseEntryUpdateManyWithoutSubcategoryNestedInput
  }

  export type ExpenseSubcategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    category_uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    entries?: ExpenseEntryUncheckedUpdateManyWithoutSubcategoryNestedInput
  }

  export type ExpenseSubcategoryCreateManyInput = {
    id?: number
    uuid?: string
    user_uuid?: string | null
    category_uuid: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ExpenseSubcategoryUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseSubcategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    category_uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseEntryCreateInput = {
    uuid?: string
    type: $Enums.ExpenseEntryType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    entry_date?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutExpense_entriesInput
    from_account: ExpenseAccountCreateNestedOneWithoutEntries_fromInput
    to_account?: ExpenseAccountCreateNestedOneWithoutEntries_toInput
    category: ExpenseCategoryCreateNestedOneWithoutEntriesInput
    subcategory: ExpenseSubcategoryCreateNestedOneWithoutEntriesInput
  }

  export type ExpenseEntryUncheckedCreateInput = {
    id?: number
    uuid?: string
    user_uuid: string
    type: $Enums.ExpenseEntryType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    from_account_uuid: string
    to_account_uuid?: string | null
    category_uuid: string
    subcategory_uuid: string
    entry_date?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ExpenseEntryUpdateInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    type?: EnumExpenseEntryTypeFieldUpdateOperationsInput | $Enums.ExpenseEntryType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    entry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutExpense_entriesNestedInput
    from_account?: ExpenseAccountUpdateOneRequiredWithoutEntries_fromNestedInput
    to_account?: ExpenseAccountUpdateOneWithoutEntries_toNestedInput
    category?: ExpenseCategoryUpdateOneRequiredWithoutEntriesNestedInput
    subcategory?: ExpenseSubcategoryUpdateOneRequiredWithoutEntriesNestedInput
  }

  export type ExpenseEntryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    type?: EnumExpenseEntryTypeFieldUpdateOperationsInput | $Enums.ExpenseEntryType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    from_account_uuid?: StringFieldUpdateOperationsInput | string
    to_account_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    category_uuid?: StringFieldUpdateOperationsInput | string
    subcategory_uuid?: StringFieldUpdateOperationsInput | string
    entry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseEntryCreateManyInput = {
    id?: number
    uuid?: string
    user_uuid: string
    type: $Enums.ExpenseEntryType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    from_account_uuid: string
    to_account_uuid?: string | null
    category_uuid: string
    subcategory_uuid: string
    entry_date?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ExpenseEntryUpdateManyMutationInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    type?: EnumExpenseEntryTypeFieldUpdateOperationsInput | $Enums.ExpenseEntryType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    entry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseEntryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    type?: EnumExpenseEntryTypeFieldUpdateOperationsInput | $Enums.ExpenseEntryType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    from_account_uuid?: StringFieldUpdateOperationsInput | string
    to_account_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    category_uuid?: StringFieldUpdateOperationsInput | string
    subcategory_uuid?: StringFieldUpdateOperationsInput | string
    entry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumAuthRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthRole | EnumAuthRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AuthRole[] | ListEnumAuthRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthRole[] | ListEnumAuthRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthRoleFilter<$PrismaModel> | $Enums.AuthRole
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ActivityListRelationFilter = {
    every?: ActivityWhereInput
    some?: ActivityWhereInput
    none?: ActivityWhereInput
  }

  export type ScheduleSlotListRelationFilter = {
    every?: ScheduleSlotWhereInput
    some?: ScheduleSlotWhereInput
    none?: ScheduleSlotWhereInput
  }

  export type ExpenseAccountListRelationFilter = {
    every?: ExpenseAccountWhereInput
    some?: ExpenseAccountWhereInput
    none?: ExpenseAccountWhereInput
  }

  export type ExpenseEntryListRelationFilter = {
    every?: ExpenseEntryWhereInput
    some?: ExpenseEntryWhereInput
    none?: ExpenseEntryWhereInput
  }

  export type ExpenseCategoryListRelationFilter = {
    every?: ExpenseCategoryWhereInput
    some?: ExpenseCategoryWhereInput
    none?: ExpenseCategoryWhereInput
  }

  export type ExpenseSubcategoryListRelationFilter = {
    every?: ExpenseSubcategoryWhereInput
    some?: ExpenseSubcategoryWhereInput
    none?: ExpenseSubcategoryWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ActivityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ScheduleSlotOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExpenseAccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExpenseEntryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExpenseCategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ExpenseSubcategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    first_name?: SortOrder
    last_name?: SortOrder
    role?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumAuthRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthRole | EnumAuthRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AuthRole[] | ListEnumAuthRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthRole[] | ListEnumAuthRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthRoleWithAggregatesFilter<$PrismaModel> | $Enums.AuthRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthRoleFilter<$PrismaModel>
    _max?: NestedEnumAuthRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ActivityCountOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    name?: SortOrder
    color?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ActivityAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    name?: SortOrder
    color?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ActivityMinOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    name?: SortOrder
    color?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ActivitySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumScheduleDayFilter<$PrismaModel = never> = {
    equals?: $Enums.ScheduleDay | EnumScheduleDayFieldRefInput<$PrismaModel>
    in?: $Enums.ScheduleDay[] | ListEnumScheduleDayFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScheduleDay[] | ListEnumScheduleDayFieldRefInput<$PrismaModel>
    not?: NestedEnumScheduleDayFilter<$PrismaModel> | $Enums.ScheduleDay
  }

  export type ActivityScalarRelationFilter = {
    is?: ActivityWhereInput
    isNot?: ActivityWhereInput
  }

  export type ScheduleSlotCountOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    activity_uuid?: SortOrder
    day?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ScheduleSlotAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ScheduleSlotMaxOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    activity_uuid?: SortOrder
    day?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ScheduleSlotMinOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    activity_uuid?: SortOrder
    day?: SortOrder
    start_time?: SortOrder
    end_time?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ScheduleSlotSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumScheduleDayWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ScheduleDay | EnumScheduleDayFieldRefInput<$PrismaModel>
    in?: $Enums.ScheduleDay[] | ListEnumScheduleDayFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScheduleDay[] | ListEnumScheduleDayFieldRefInput<$PrismaModel>
    not?: NestedEnumScheduleDayWithAggregatesFilter<$PrismaModel> | $Enums.ScheduleDay
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumScheduleDayFilter<$PrismaModel>
    _max?: NestedEnumScheduleDayFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type ExpenseAccountCountOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    balance?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ExpenseAccountAvgOrderByAggregateInput = {
    id?: SortOrder
    balance?: SortOrder
  }

  export type ExpenseAccountMaxOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    balance?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ExpenseAccountMinOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    balance?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ExpenseAccountSumOrderByAggregateInput = {
    id?: SortOrder
    balance?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type ExpenseCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ExpenseCategoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ExpenseCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ExpenseCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    name?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ExpenseCategorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ExpenseCategoryScalarRelationFilter = {
    is?: ExpenseCategoryWhereInput
    isNot?: ExpenseCategoryWhereInput
  }

  export type ExpenseSubcategoryCountOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    category_uuid?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ExpenseSubcategoryAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ExpenseSubcategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    category_uuid?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ExpenseSubcategoryMinOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    category_uuid?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ExpenseSubcategorySumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumExpenseEntryTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ExpenseEntryType | EnumExpenseEntryTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExpenseEntryType[] | ListEnumExpenseEntryTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExpenseEntryType[] | ListEnumExpenseEntryTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExpenseEntryTypeFilter<$PrismaModel> | $Enums.ExpenseEntryType
  }

  export type ExpenseAccountScalarRelationFilter = {
    is?: ExpenseAccountWhereInput
    isNot?: ExpenseAccountWhereInput
  }

  export type ExpenseAccountNullableScalarRelationFilter = {
    is?: ExpenseAccountWhereInput | null
    isNot?: ExpenseAccountWhereInput | null
  }

  export type ExpenseSubcategoryScalarRelationFilter = {
    is?: ExpenseSubcategoryWhereInput
    isNot?: ExpenseSubcategoryWhereInput
  }

  export type ExpenseEntryCountOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    from_account_uuid?: SortOrder
    to_account_uuid?: SortOrder
    category_uuid?: SortOrder
    subcategory_uuid?: SortOrder
    entry_date?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ExpenseEntryAvgOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
  }

  export type ExpenseEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    from_account_uuid?: SortOrder
    to_account_uuid?: SortOrder
    category_uuid?: SortOrder
    subcategory_uuid?: SortOrder
    entry_date?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ExpenseEntryMinOrderByAggregateInput = {
    id?: SortOrder
    uuid?: SortOrder
    user_uuid?: SortOrder
    type?: SortOrder
    amount?: SortOrder
    description?: SortOrder
    from_account_uuid?: SortOrder
    to_account_uuid?: SortOrder
    category_uuid?: SortOrder
    subcategory_uuid?: SortOrder
    entry_date?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type ExpenseEntrySumOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
  }

  export type EnumExpenseEntryTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExpenseEntryType | EnumExpenseEntryTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExpenseEntryType[] | ListEnumExpenseEntryTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExpenseEntryType[] | ListEnumExpenseEntryTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExpenseEntryTypeWithAggregatesFilter<$PrismaModel> | $Enums.ExpenseEntryType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExpenseEntryTypeFilter<$PrismaModel>
    _max?: NestedEnumExpenseEntryTypeFilter<$PrismaModel>
  }

  export type ActivityCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type ScheduleSlotCreateNestedManyWithoutUserInput = {
    create?: XOR<ScheduleSlotCreateWithoutUserInput, ScheduleSlotUncheckedCreateWithoutUserInput> | ScheduleSlotCreateWithoutUserInput[] | ScheduleSlotUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ScheduleSlotCreateOrConnectWithoutUserInput | ScheduleSlotCreateOrConnectWithoutUserInput[]
    createMany?: ScheduleSlotCreateManyUserInputEnvelope
    connect?: ScheduleSlotWhereUniqueInput | ScheduleSlotWhereUniqueInput[]
  }

  export type ExpenseAccountCreateNestedManyWithoutUserInput = {
    create?: XOR<ExpenseAccountCreateWithoutUserInput, ExpenseAccountUncheckedCreateWithoutUserInput> | ExpenseAccountCreateWithoutUserInput[] | ExpenseAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExpenseAccountCreateOrConnectWithoutUserInput | ExpenseAccountCreateOrConnectWithoutUserInput[]
    createMany?: ExpenseAccountCreateManyUserInputEnvelope
    connect?: ExpenseAccountWhereUniqueInput | ExpenseAccountWhereUniqueInput[]
  }

  export type ExpenseEntryCreateNestedManyWithoutUserInput = {
    create?: XOR<ExpenseEntryCreateWithoutUserInput, ExpenseEntryUncheckedCreateWithoutUserInput> | ExpenseEntryCreateWithoutUserInput[] | ExpenseEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExpenseEntryCreateOrConnectWithoutUserInput | ExpenseEntryCreateOrConnectWithoutUserInput[]
    createMany?: ExpenseEntryCreateManyUserInputEnvelope
    connect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
  }

  export type ExpenseCategoryCreateNestedManyWithoutUserInput = {
    create?: XOR<ExpenseCategoryCreateWithoutUserInput, ExpenseCategoryUncheckedCreateWithoutUserInput> | ExpenseCategoryCreateWithoutUserInput[] | ExpenseCategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExpenseCategoryCreateOrConnectWithoutUserInput | ExpenseCategoryCreateOrConnectWithoutUserInput[]
    createMany?: ExpenseCategoryCreateManyUserInputEnvelope
    connect?: ExpenseCategoryWhereUniqueInput | ExpenseCategoryWhereUniqueInput[]
  }

  export type ExpenseSubcategoryCreateNestedManyWithoutUserInput = {
    create?: XOR<ExpenseSubcategoryCreateWithoutUserInput, ExpenseSubcategoryUncheckedCreateWithoutUserInput> | ExpenseSubcategoryCreateWithoutUserInput[] | ExpenseSubcategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExpenseSubcategoryCreateOrConnectWithoutUserInput | ExpenseSubcategoryCreateOrConnectWithoutUserInput[]
    createMany?: ExpenseSubcategoryCreateManyUserInputEnvelope
    connect?: ExpenseSubcategoryWhereUniqueInput | ExpenseSubcategoryWhereUniqueInput[]
  }

  export type ActivityUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type ScheduleSlotUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ScheduleSlotCreateWithoutUserInput, ScheduleSlotUncheckedCreateWithoutUserInput> | ScheduleSlotCreateWithoutUserInput[] | ScheduleSlotUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ScheduleSlotCreateOrConnectWithoutUserInput | ScheduleSlotCreateOrConnectWithoutUserInput[]
    createMany?: ScheduleSlotCreateManyUserInputEnvelope
    connect?: ScheduleSlotWhereUniqueInput | ScheduleSlotWhereUniqueInput[]
  }

  export type ExpenseAccountUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ExpenseAccountCreateWithoutUserInput, ExpenseAccountUncheckedCreateWithoutUserInput> | ExpenseAccountCreateWithoutUserInput[] | ExpenseAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExpenseAccountCreateOrConnectWithoutUserInput | ExpenseAccountCreateOrConnectWithoutUserInput[]
    createMany?: ExpenseAccountCreateManyUserInputEnvelope
    connect?: ExpenseAccountWhereUniqueInput | ExpenseAccountWhereUniqueInput[]
  }

  export type ExpenseEntryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ExpenseEntryCreateWithoutUserInput, ExpenseEntryUncheckedCreateWithoutUserInput> | ExpenseEntryCreateWithoutUserInput[] | ExpenseEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExpenseEntryCreateOrConnectWithoutUserInput | ExpenseEntryCreateOrConnectWithoutUserInput[]
    createMany?: ExpenseEntryCreateManyUserInputEnvelope
    connect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
  }

  export type ExpenseCategoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ExpenseCategoryCreateWithoutUserInput, ExpenseCategoryUncheckedCreateWithoutUserInput> | ExpenseCategoryCreateWithoutUserInput[] | ExpenseCategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExpenseCategoryCreateOrConnectWithoutUserInput | ExpenseCategoryCreateOrConnectWithoutUserInput[]
    createMany?: ExpenseCategoryCreateManyUserInputEnvelope
    connect?: ExpenseCategoryWhereUniqueInput | ExpenseCategoryWhereUniqueInput[]
  }

  export type ExpenseSubcategoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ExpenseSubcategoryCreateWithoutUserInput, ExpenseSubcategoryUncheckedCreateWithoutUserInput> | ExpenseSubcategoryCreateWithoutUserInput[] | ExpenseSubcategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExpenseSubcategoryCreateOrConnectWithoutUserInput | ExpenseSubcategoryCreateOrConnectWithoutUserInput[]
    createMany?: ExpenseSubcategoryCreateManyUserInputEnvelope
    connect?: ExpenseSubcategoryWhereUniqueInput | ExpenseSubcategoryWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumAuthRoleFieldUpdateOperationsInput = {
    set?: $Enums.AuthRole
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ActivityUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutUserInput | ActivityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutUserInput | ActivityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutUserInput | ActivityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type ScheduleSlotUpdateManyWithoutUserNestedInput = {
    create?: XOR<ScheduleSlotCreateWithoutUserInput, ScheduleSlotUncheckedCreateWithoutUserInput> | ScheduleSlotCreateWithoutUserInput[] | ScheduleSlotUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ScheduleSlotCreateOrConnectWithoutUserInput | ScheduleSlotCreateOrConnectWithoutUserInput[]
    upsert?: ScheduleSlotUpsertWithWhereUniqueWithoutUserInput | ScheduleSlotUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ScheduleSlotCreateManyUserInputEnvelope
    set?: ScheduleSlotWhereUniqueInput | ScheduleSlotWhereUniqueInput[]
    disconnect?: ScheduleSlotWhereUniqueInput | ScheduleSlotWhereUniqueInput[]
    delete?: ScheduleSlotWhereUniqueInput | ScheduleSlotWhereUniqueInput[]
    connect?: ScheduleSlotWhereUniqueInput | ScheduleSlotWhereUniqueInput[]
    update?: ScheduleSlotUpdateWithWhereUniqueWithoutUserInput | ScheduleSlotUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ScheduleSlotUpdateManyWithWhereWithoutUserInput | ScheduleSlotUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ScheduleSlotScalarWhereInput | ScheduleSlotScalarWhereInput[]
  }

  export type ExpenseAccountUpdateManyWithoutUserNestedInput = {
    create?: XOR<ExpenseAccountCreateWithoutUserInput, ExpenseAccountUncheckedCreateWithoutUserInput> | ExpenseAccountCreateWithoutUserInput[] | ExpenseAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExpenseAccountCreateOrConnectWithoutUserInput | ExpenseAccountCreateOrConnectWithoutUserInput[]
    upsert?: ExpenseAccountUpsertWithWhereUniqueWithoutUserInput | ExpenseAccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ExpenseAccountCreateManyUserInputEnvelope
    set?: ExpenseAccountWhereUniqueInput | ExpenseAccountWhereUniqueInput[]
    disconnect?: ExpenseAccountWhereUniqueInput | ExpenseAccountWhereUniqueInput[]
    delete?: ExpenseAccountWhereUniqueInput | ExpenseAccountWhereUniqueInput[]
    connect?: ExpenseAccountWhereUniqueInput | ExpenseAccountWhereUniqueInput[]
    update?: ExpenseAccountUpdateWithWhereUniqueWithoutUserInput | ExpenseAccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ExpenseAccountUpdateManyWithWhereWithoutUserInput | ExpenseAccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ExpenseAccountScalarWhereInput | ExpenseAccountScalarWhereInput[]
  }

  export type ExpenseEntryUpdateManyWithoutUserNestedInput = {
    create?: XOR<ExpenseEntryCreateWithoutUserInput, ExpenseEntryUncheckedCreateWithoutUserInput> | ExpenseEntryCreateWithoutUserInput[] | ExpenseEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExpenseEntryCreateOrConnectWithoutUserInput | ExpenseEntryCreateOrConnectWithoutUserInput[]
    upsert?: ExpenseEntryUpsertWithWhereUniqueWithoutUserInput | ExpenseEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ExpenseEntryCreateManyUserInputEnvelope
    set?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    disconnect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    delete?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    connect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    update?: ExpenseEntryUpdateWithWhereUniqueWithoutUserInput | ExpenseEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ExpenseEntryUpdateManyWithWhereWithoutUserInput | ExpenseEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ExpenseEntryScalarWhereInput | ExpenseEntryScalarWhereInput[]
  }

  export type ExpenseCategoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<ExpenseCategoryCreateWithoutUserInput, ExpenseCategoryUncheckedCreateWithoutUserInput> | ExpenseCategoryCreateWithoutUserInput[] | ExpenseCategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExpenseCategoryCreateOrConnectWithoutUserInput | ExpenseCategoryCreateOrConnectWithoutUserInput[]
    upsert?: ExpenseCategoryUpsertWithWhereUniqueWithoutUserInput | ExpenseCategoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ExpenseCategoryCreateManyUserInputEnvelope
    set?: ExpenseCategoryWhereUniqueInput | ExpenseCategoryWhereUniqueInput[]
    disconnect?: ExpenseCategoryWhereUniqueInput | ExpenseCategoryWhereUniqueInput[]
    delete?: ExpenseCategoryWhereUniqueInput | ExpenseCategoryWhereUniqueInput[]
    connect?: ExpenseCategoryWhereUniqueInput | ExpenseCategoryWhereUniqueInput[]
    update?: ExpenseCategoryUpdateWithWhereUniqueWithoutUserInput | ExpenseCategoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ExpenseCategoryUpdateManyWithWhereWithoutUserInput | ExpenseCategoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ExpenseCategoryScalarWhereInput | ExpenseCategoryScalarWhereInput[]
  }

  export type ExpenseSubcategoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<ExpenseSubcategoryCreateWithoutUserInput, ExpenseSubcategoryUncheckedCreateWithoutUserInput> | ExpenseSubcategoryCreateWithoutUserInput[] | ExpenseSubcategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExpenseSubcategoryCreateOrConnectWithoutUserInput | ExpenseSubcategoryCreateOrConnectWithoutUserInput[]
    upsert?: ExpenseSubcategoryUpsertWithWhereUniqueWithoutUserInput | ExpenseSubcategoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ExpenseSubcategoryCreateManyUserInputEnvelope
    set?: ExpenseSubcategoryWhereUniqueInput | ExpenseSubcategoryWhereUniqueInput[]
    disconnect?: ExpenseSubcategoryWhereUniqueInput | ExpenseSubcategoryWhereUniqueInput[]
    delete?: ExpenseSubcategoryWhereUniqueInput | ExpenseSubcategoryWhereUniqueInput[]
    connect?: ExpenseSubcategoryWhereUniqueInput | ExpenseSubcategoryWhereUniqueInput[]
    update?: ExpenseSubcategoryUpdateWithWhereUniqueWithoutUserInput | ExpenseSubcategoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ExpenseSubcategoryUpdateManyWithWhereWithoutUserInput | ExpenseSubcategoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ExpenseSubcategoryScalarWhereInput | ExpenseSubcategoryScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ActivityUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutUserInput | ActivityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutUserInput | ActivityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutUserInput | ActivityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type ScheduleSlotUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ScheduleSlotCreateWithoutUserInput, ScheduleSlotUncheckedCreateWithoutUserInput> | ScheduleSlotCreateWithoutUserInput[] | ScheduleSlotUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ScheduleSlotCreateOrConnectWithoutUserInput | ScheduleSlotCreateOrConnectWithoutUserInput[]
    upsert?: ScheduleSlotUpsertWithWhereUniqueWithoutUserInput | ScheduleSlotUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ScheduleSlotCreateManyUserInputEnvelope
    set?: ScheduleSlotWhereUniqueInput | ScheduleSlotWhereUniqueInput[]
    disconnect?: ScheduleSlotWhereUniqueInput | ScheduleSlotWhereUniqueInput[]
    delete?: ScheduleSlotWhereUniqueInput | ScheduleSlotWhereUniqueInput[]
    connect?: ScheduleSlotWhereUniqueInput | ScheduleSlotWhereUniqueInput[]
    update?: ScheduleSlotUpdateWithWhereUniqueWithoutUserInput | ScheduleSlotUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ScheduleSlotUpdateManyWithWhereWithoutUserInput | ScheduleSlotUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ScheduleSlotScalarWhereInput | ScheduleSlotScalarWhereInput[]
  }

  export type ExpenseAccountUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ExpenseAccountCreateWithoutUserInput, ExpenseAccountUncheckedCreateWithoutUserInput> | ExpenseAccountCreateWithoutUserInput[] | ExpenseAccountUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExpenseAccountCreateOrConnectWithoutUserInput | ExpenseAccountCreateOrConnectWithoutUserInput[]
    upsert?: ExpenseAccountUpsertWithWhereUniqueWithoutUserInput | ExpenseAccountUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ExpenseAccountCreateManyUserInputEnvelope
    set?: ExpenseAccountWhereUniqueInput | ExpenseAccountWhereUniqueInput[]
    disconnect?: ExpenseAccountWhereUniqueInput | ExpenseAccountWhereUniqueInput[]
    delete?: ExpenseAccountWhereUniqueInput | ExpenseAccountWhereUniqueInput[]
    connect?: ExpenseAccountWhereUniqueInput | ExpenseAccountWhereUniqueInput[]
    update?: ExpenseAccountUpdateWithWhereUniqueWithoutUserInput | ExpenseAccountUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ExpenseAccountUpdateManyWithWhereWithoutUserInput | ExpenseAccountUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ExpenseAccountScalarWhereInput | ExpenseAccountScalarWhereInput[]
  }

  export type ExpenseEntryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ExpenseEntryCreateWithoutUserInput, ExpenseEntryUncheckedCreateWithoutUserInput> | ExpenseEntryCreateWithoutUserInput[] | ExpenseEntryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExpenseEntryCreateOrConnectWithoutUserInput | ExpenseEntryCreateOrConnectWithoutUserInput[]
    upsert?: ExpenseEntryUpsertWithWhereUniqueWithoutUserInput | ExpenseEntryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ExpenseEntryCreateManyUserInputEnvelope
    set?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    disconnect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    delete?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    connect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    update?: ExpenseEntryUpdateWithWhereUniqueWithoutUserInput | ExpenseEntryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ExpenseEntryUpdateManyWithWhereWithoutUserInput | ExpenseEntryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ExpenseEntryScalarWhereInput | ExpenseEntryScalarWhereInput[]
  }

  export type ExpenseCategoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ExpenseCategoryCreateWithoutUserInput, ExpenseCategoryUncheckedCreateWithoutUserInput> | ExpenseCategoryCreateWithoutUserInput[] | ExpenseCategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExpenseCategoryCreateOrConnectWithoutUserInput | ExpenseCategoryCreateOrConnectWithoutUserInput[]
    upsert?: ExpenseCategoryUpsertWithWhereUniqueWithoutUserInput | ExpenseCategoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ExpenseCategoryCreateManyUserInputEnvelope
    set?: ExpenseCategoryWhereUniqueInput | ExpenseCategoryWhereUniqueInput[]
    disconnect?: ExpenseCategoryWhereUniqueInput | ExpenseCategoryWhereUniqueInput[]
    delete?: ExpenseCategoryWhereUniqueInput | ExpenseCategoryWhereUniqueInput[]
    connect?: ExpenseCategoryWhereUniqueInput | ExpenseCategoryWhereUniqueInput[]
    update?: ExpenseCategoryUpdateWithWhereUniqueWithoutUserInput | ExpenseCategoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ExpenseCategoryUpdateManyWithWhereWithoutUserInput | ExpenseCategoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ExpenseCategoryScalarWhereInput | ExpenseCategoryScalarWhereInput[]
  }

  export type ExpenseSubcategoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ExpenseSubcategoryCreateWithoutUserInput, ExpenseSubcategoryUncheckedCreateWithoutUserInput> | ExpenseSubcategoryCreateWithoutUserInput[] | ExpenseSubcategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ExpenseSubcategoryCreateOrConnectWithoutUserInput | ExpenseSubcategoryCreateOrConnectWithoutUserInput[]
    upsert?: ExpenseSubcategoryUpsertWithWhereUniqueWithoutUserInput | ExpenseSubcategoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ExpenseSubcategoryCreateManyUserInputEnvelope
    set?: ExpenseSubcategoryWhereUniqueInput | ExpenseSubcategoryWhereUniqueInput[]
    disconnect?: ExpenseSubcategoryWhereUniqueInput | ExpenseSubcategoryWhereUniqueInput[]
    delete?: ExpenseSubcategoryWhereUniqueInput | ExpenseSubcategoryWhereUniqueInput[]
    connect?: ExpenseSubcategoryWhereUniqueInput | ExpenseSubcategoryWhereUniqueInput[]
    update?: ExpenseSubcategoryUpdateWithWhereUniqueWithoutUserInput | ExpenseSubcategoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ExpenseSubcategoryUpdateManyWithWhereWithoutUserInput | ExpenseSubcategoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ExpenseSubcategoryScalarWhereInput | ExpenseSubcategoryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivitiesInput
    connect?: UserWhereUniqueInput
  }

  export type ScheduleSlotCreateNestedManyWithoutActivityInput = {
    create?: XOR<ScheduleSlotCreateWithoutActivityInput, ScheduleSlotUncheckedCreateWithoutActivityInput> | ScheduleSlotCreateWithoutActivityInput[] | ScheduleSlotUncheckedCreateWithoutActivityInput[]
    connectOrCreate?: ScheduleSlotCreateOrConnectWithoutActivityInput | ScheduleSlotCreateOrConnectWithoutActivityInput[]
    createMany?: ScheduleSlotCreateManyActivityInputEnvelope
    connect?: ScheduleSlotWhereUniqueInput | ScheduleSlotWhereUniqueInput[]
  }

  export type ScheduleSlotUncheckedCreateNestedManyWithoutActivityInput = {
    create?: XOR<ScheduleSlotCreateWithoutActivityInput, ScheduleSlotUncheckedCreateWithoutActivityInput> | ScheduleSlotCreateWithoutActivityInput[] | ScheduleSlotUncheckedCreateWithoutActivityInput[]
    connectOrCreate?: ScheduleSlotCreateOrConnectWithoutActivityInput | ScheduleSlotCreateOrConnectWithoutActivityInput[]
    createMany?: ScheduleSlotCreateManyActivityInputEnvelope
    connect?: ScheduleSlotWhereUniqueInput | ScheduleSlotWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutActivitiesNestedInput = {
    create?: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivitiesInput
    upsert?: UserUpsertWithoutActivitiesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActivitiesInput, UserUpdateWithoutActivitiesInput>, UserUncheckedUpdateWithoutActivitiesInput>
  }

  export type ScheduleSlotUpdateManyWithoutActivityNestedInput = {
    create?: XOR<ScheduleSlotCreateWithoutActivityInput, ScheduleSlotUncheckedCreateWithoutActivityInput> | ScheduleSlotCreateWithoutActivityInput[] | ScheduleSlotUncheckedCreateWithoutActivityInput[]
    connectOrCreate?: ScheduleSlotCreateOrConnectWithoutActivityInput | ScheduleSlotCreateOrConnectWithoutActivityInput[]
    upsert?: ScheduleSlotUpsertWithWhereUniqueWithoutActivityInput | ScheduleSlotUpsertWithWhereUniqueWithoutActivityInput[]
    createMany?: ScheduleSlotCreateManyActivityInputEnvelope
    set?: ScheduleSlotWhereUniqueInput | ScheduleSlotWhereUniqueInput[]
    disconnect?: ScheduleSlotWhereUniqueInput | ScheduleSlotWhereUniqueInput[]
    delete?: ScheduleSlotWhereUniqueInput | ScheduleSlotWhereUniqueInput[]
    connect?: ScheduleSlotWhereUniqueInput | ScheduleSlotWhereUniqueInput[]
    update?: ScheduleSlotUpdateWithWhereUniqueWithoutActivityInput | ScheduleSlotUpdateWithWhereUniqueWithoutActivityInput[]
    updateMany?: ScheduleSlotUpdateManyWithWhereWithoutActivityInput | ScheduleSlotUpdateManyWithWhereWithoutActivityInput[]
    deleteMany?: ScheduleSlotScalarWhereInput | ScheduleSlotScalarWhereInput[]
  }

  export type ScheduleSlotUncheckedUpdateManyWithoutActivityNestedInput = {
    create?: XOR<ScheduleSlotCreateWithoutActivityInput, ScheduleSlotUncheckedCreateWithoutActivityInput> | ScheduleSlotCreateWithoutActivityInput[] | ScheduleSlotUncheckedCreateWithoutActivityInput[]
    connectOrCreate?: ScheduleSlotCreateOrConnectWithoutActivityInput | ScheduleSlotCreateOrConnectWithoutActivityInput[]
    upsert?: ScheduleSlotUpsertWithWhereUniqueWithoutActivityInput | ScheduleSlotUpsertWithWhereUniqueWithoutActivityInput[]
    createMany?: ScheduleSlotCreateManyActivityInputEnvelope
    set?: ScheduleSlotWhereUniqueInput | ScheduleSlotWhereUniqueInput[]
    disconnect?: ScheduleSlotWhereUniqueInput | ScheduleSlotWhereUniqueInput[]
    delete?: ScheduleSlotWhereUniqueInput | ScheduleSlotWhereUniqueInput[]
    connect?: ScheduleSlotWhereUniqueInput | ScheduleSlotWhereUniqueInput[]
    update?: ScheduleSlotUpdateWithWhereUniqueWithoutActivityInput | ScheduleSlotUpdateWithWhereUniqueWithoutActivityInput[]
    updateMany?: ScheduleSlotUpdateManyWithWhereWithoutActivityInput | ScheduleSlotUpdateManyWithWhereWithoutActivityInput[]
    deleteMany?: ScheduleSlotScalarWhereInput | ScheduleSlotScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSchedule_slotsInput = {
    create?: XOR<UserCreateWithoutSchedule_slotsInput, UserUncheckedCreateWithoutSchedule_slotsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSchedule_slotsInput
    connect?: UserWhereUniqueInput
  }

  export type ActivityCreateNestedOneWithoutSchedule_slotsInput = {
    create?: XOR<ActivityCreateWithoutSchedule_slotsInput, ActivityUncheckedCreateWithoutSchedule_slotsInput>
    connectOrCreate?: ActivityCreateOrConnectWithoutSchedule_slotsInput
    connect?: ActivityWhereUniqueInput
  }

  export type EnumScheduleDayFieldUpdateOperationsInput = {
    set?: $Enums.ScheduleDay
  }

  export type UserUpdateOneRequiredWithoutSchedule_slotsNestedInput = {
    create?: XOR<UserCreateWithoutSchedule_slotsInput, UserUncheckedCreateWithoutSchedule_slotsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSchedule_slotsInput
    upsert?: UserUpsertWithoutSchedule_slotsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSchedule_slotsInput, UserUpdateWithoutSchedule_slotsInput>, UserUncheckedUpdateWithoutSchedule_slotsInput>
  }

  export type ActivityUpdateOneRequiredWithoutSchedule_slotsNestedInput = {
    create?: XOR<ActivityCreateWithoutSchedule_slotsInput, ActivityUncheckedCreateWithoutSchedule_slotsInput>
    connectOrCreate?: ActivityCreateOrConnectWithoutSchedule_slotsInput
    upsert?: ActivityUpsertWithoutSchedule_slotsInput
    connect?: ActivityWhereUniqueInput
    update?: XOR<XOR<ActivityUpdateToOneWithWhereWithoutSchedule_slotsInput, ActivityUpdateWithoutSchedule_slotsInput>, ActivityUncheckedUpdateWithoutSchedule_slotsInput>
  }

  export type UserCreateNestedOneWithoutExpense_accountsInput = {
    create?: XOR<UserCreateWithoutExpense_accountsInput, UserUncheckedCreateWithoutExpense_accountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutExpense_accountsInput
    connect?: UserWhereUniqueInput
  }

  export type ExpenseEntryCreateNestedManyWithoutFrom_accountInput = {
    create?: XOR<ExpenseEntryCreateWithoutFrom_accountInput, ExpenseEntryUncheckedCreateWithoutFrom_accountInput> | ExpenseEntryCreateWithoutFrom_accountInput[] | ExpenseEntryUncheckedCreateWithoutFrom_accountInput[]
    connectOrCreate?: ExpenseEntryCreateOrConnectWithoutFrom_accountInput | ExpenseEntryCreateOrConnectWithoutFrom_accountInput[]
    createMany?: ExpenseEntryCreateManyFrom_accountInputEnvelope
    connect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
  }

  export type ExpenseEntryCreateNestedManyWithoutTo_accountInput = {
    create?: XOR<ExpenseEntryCreateWithoutTo_accountInput, ExpenseEntryUncheckedCreateWithoutTo_accountInput> | ExpenseEntryCreateWithoutTo_accountInput[] | ExpenseEntryUncheckedCreateWithoutTo_accountInput[]
    connectOrCreate?: ExpenseEntryCreateOrConnectWithoutTo_accountInput | ExpenseEntryCreateOrConnectWithoutTo_accountInput[]
    createMany?: ExpenseEntryCreateManyTo_accountInputEnvelope
    connect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
  }

  export type ExpenseEntryUncheckedCreateNestedManyWithoutFrom_accountInput = {
    create?: XOR<ExpenseEntryCreateWithoutFrom_accountInput, ExpenseEntryUncheckedCreateWithoutFrom_accountInput> | ExpenseEntryCreateWithoutFrom_accountInput[] | ExpenseEntryUncheckedCreateWithoutFrom_accountInput[]
    connectOrCreate?: ExpenseEntryCreateOrConnectWithoutFrom_accountInput | ExpenseEntryCreateOrConnectWithoutFrom_accountInput[]
    createMany?: ExpenseEntryCreateManyFrom_accountInputEnvelope
    connect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
  }

  export type ExpenseEntryUncheckedCreateNestedManyWithoutTo_accountInput = {
    create?: XOR<ExpenseEntryCreateWithoutTo_accountInput, ExpenseEntryUncheckedCreateWithoutTo_accountInput> | ExpenseEntryCreateWithoutTo_accountInput[] | ExpenseEntryUncheckedCreateWithoutTo_accountInput[]
    connectOrCreate?: ExpenseEntryCreateOrConnectWithoutTo_accountInput | ExpenseEntryCreateOrConnectWithoutTo_accountInput[]
    createMany?: ExpenseEntryCreateManyTo_accountInputEnvelope
    connect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UserUpdateOneRequiredWithoutExpense_accountsNestedInput = {
    create?: XOR<UserCreateWithoutExpense_accountsInput, UserUncheckedCreateWithoutExpense_accountsInput>
    connectOrCreate?: UserCreateOrConnectWithoutExpense_accountsInput
    upsert?: UserUpsertWithoutExpense_accountsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutExpense_accountsInput, UserUpdateWithoutExpense_accountsInput>, UserUncheckedUpdateWithoutExpense_accountsInput>
  }

  export type ExpenseEntryUpdateManyWithoutFrom_accountNestedInput = {
    create?: XOR<ExpenseEntryCreateWithoutFrom_accountInput, ExpenseEntryUncheckedCreateWithoutFrom_accountInput> | ExpenseEntryCreateWithoutFrom_accountInput[] | ExpenseEntryUncheckedCreateWithoutFrom_accountInput[]
    connectOrCreate?: ExpenseEntryCreateOrConnectWithoutFrom_accountInput | ExpenseEntryCreateOrConnectWithoutFrom_accountInput[]
    upsert?: ExpenseEntryUpsertWithWhereUniqueWithoutFrom_accountInput | ExpenseEntryUpsertWithWhereUniqueWithoutFrom_accountInput[]
    createMany?: ExpenseEntryCreateManyFrom_accountInputEnvelope
    set?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    disconnect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    delete?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    connect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    update?: ExpenseEntryUpdateWithWhereUniqueWithoutFrom_accountInput | ExpenseEntryUpdateWithWhereUniqueWithoutFrom_accountInput[]
    updateMany?: ExpenseEntryUpdateManyWithWhereWithoutFrom_accountInput | ExpenseEntryUpdateManyWithWhereWithoutFrom_accountInput[]
    deleteMany?: ExpenseEntryScalarWhereInput | ExpenseEntryScalarWhereInput[]
  }

  export type ExpenseEntryUpdateManyWithoutTo_accountNestedInput = {
    create?: XOR<ExpenseEntryCreateWithoutTo_accountInput, ExpenseEntryUncheckedCreateWithoutTo_accountInput> | ExpenseEntryCreateWithoutTo_accountInput[] | ExpenseEntryUncheckedCreateWithoutTo_accountInput[]
    connectOrCreate?: ExpenseEntryCreateOrConnectWithoutTo_accountInput | ExpenseEntryCreateOrConnectWithoutTo_accountInput[]
    upsert?: ExpenseEntryUpsertWithWhereUniqueWithoutTo_accountInput | ExpenseEntryUpsertWithWhereUniqueWithoutTo_accountInput[]
    createMany?: ExpenseEntryCreateManyTo_accountInputEnvelope
    set?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    disconnect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    delete?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    connect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    update?: ExpenseEntryUpdateWithWhereUniqueWithoutTo_accountInput | ExpenseEntryUpdateWithWhereUniqueWithoutTo_accountInput[]
    updateMany?: ExpenseEntryUpdateManyWithWhereWithoutTo_accountInput | ExpenseEntryUpdateManyWithWhereWithoutTo_accountInput[]
    deleteMany?: ExpenseEntryScalarWhereInput | ExpenseEntryScalarWhereInput[]
  }

  export type ExpenseEntryUncheckedUpdateManyWithoutFrom_accountNestedInput = {
    create?: XOR<ExpenseEntryCreateWithoutFrom_accountInput, ExpenseEntryUncheckedCreateWithoutFrom_accountInput> | ExpenseEntryCreateWithoutFrom_accountInput[] | ExpenseEntryUncheckedCreateWithoutFrom_accountInput[]
    connectOrCreate?: ExpenseEntryCreateOrConnectWithoutFrom_accountInput | ExpenseEntryCreateOrConnectWithoutFrom_accountInput[]
    upsert?: ExpenseEntryUpsertWithWhereUniqueWithoutFrom_accountInput | ExpenseEntryUpsertWithWhereUniqueWithoutFrom_accountInput[]
    createMany?: ExpenseEntryCreateManyFrom_accountInputEnvelope
    set?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    disconnect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    delete?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    connect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    update?: ExpenseEntryUpdateWithWhereUniqueWithoutFrom_accountInput | ExpenseEntryUpdateWithWhereUniqueWithoutFrom_accountInput[]
    updateMany?: ExpenseEntryUpdateManyWithWhereWithoutFrom_accountInput | ExpenseEntryUpdateManyWithWhereWithoutFrom_accountInput[]
    deleteMany?: ExpenseEntryScalarWhereInput | ExpenseEntryScalarWhereInput[]
  }

  export type ExpenseEntryUncheckedUpdateManyWithoutTo_accountNestedInput = {
    create?: XOR<ExpenseEntryCreateWithoutTo_accountInput, ExpenseEntryUncheckedCreateWithoutTo_accountInput> | ExpenseEntryCreateWithoutTo_accountInput[] | ExpenseEntryUncheckedCreateWithoutTo_accountInput[]
    connectOrCreate?: ExpenseEntryCreateOrConnectWithoutTo_accountInput | ExpenseEntryCreateOrConnectWithoutTo_accountInput[]
    upsert?: ExpenseEntryUpsertWithWhereUniqueWithoutTo_accountInput | ExpenseEntryUpsertWithWhereUniqueWithoutTo_accountInput[]
    createMany?: ExpenseEntryCreateManyTo_accountInputEnvelope
    set?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    disconnect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    delete?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    connect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    update?: ExpenseEntryUpdateWithWhereUniqueWithoutTo_accountInput | ExpenseEntryUpdateWithWhereUniqueWithoutTo_accountInput[]
    updateMany?: ExpenseEntryUpdateManyWithWhereWithoutTo_accountInput | ExpenseEntryUpdateManyWithWhereWithoutTo_accountInput[]
    deleteMany?: ExpenseEntryScalarWhereInput | ExpenseEntryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCategoriesInput
    connect?: UserWhereUniqueInput
  }

  export type ExpenseSubcategoryCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ExpenseSubcategoryCreateWithoutCategoryInput, ExpenseSubcategoryUncheckedCreateWithoutCategoryInput> | ExpenseSubcategoryCreateWithoutCategoryInput[] | ExpenseSubcategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ExpenseSubcategoryCreateOrConnectWithoutCategoryInput | ExpenseSubcategoryCreateOrConnectWithoutCategoryInput[]
    createMany?: ExpenseSubcategoryCreateManyCategoryInputEnvelope
    connect?: ExpenseSubcategoryWhereUniqueInput | ExpenseSubcategoryWhereUniqueInput[]
  }

  export type ExpenseEntryCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ExpenseEntryCreateWithoutCategoryInput, ExpenseEntryUncheckedCreateWithoutCategoryInput> | ExpenseEntryCreateWithoutCategoryInput[] | ExpenseEntryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ExpenseEntryCreateOrConnectWithoutCategoryInput | ExpenseEntryCreateOrConnectWithoutCategoryInput[]
    createMany?: ExpenseEntryCreateManyCategoryInputEnvelope
    connect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
  }

  export type ExpenseSubcategoryUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ExpenseSubcategoryCreateWithoutCategoryInput, ExpenseSubcategoryUncheckedCreateWithoutCategoryInput> | ExpenseSubcategoryCreateWithoutCategoryInput[] | ExpenseSubcategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ExpenseSubcategoryCreateOrConnectWithoutCategoryInput | ExpenseSubcategoryCreateOrConnectWithoutCategoryInput[]
    createMany?: ExpenseSubcategoryCreateManyCategoryInputEnvelope
    connect?: ExpenseSubcategoryWhereUniqueInput | ExpenseSubcategoryWhereUniqueInput[]
  }

  export type ExpenseEntryUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ExpenseEntryCreateWithoutCategoryInput, ExpenseEntryUncheckedCreateWithoutCategoryInput> | ExpenseEntryCreateWithoutCategoryInput[] | ExpenseEntryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ExpenseEntryCreateOrConnectWithoutCategoryInput | ExpenseEntryCreateOrConnectWithoutCategoryInput[]
    createMany?: ExpenseEntryCreateManyCategoryInputEnvelope
    connect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
  }

  export type UserUpdateOneWithoutCategoriesNestedInput = {
    create?: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCategoriesInput
    upsert?: UserUpsertWithoutCategoriesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCategoriesInput, UserUpdateWithoutCategoriesInput>, UserUncheckedUpdateWithoutCategoriesInput>
  }

  export type ExpenseSubcategoryUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ExpenseSubcategoryCreateWithoutCategoryInput, ExpenseSubcategoryUncheckedCreateWithoutCategoryInput> | ExpenseSubcategoryCreateWithoutCategoryInput[] | ExpenseSubcategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ExpenseSubcategoryCreateOrConnectWithoutCategoryInput | ExpenseSubcategoryCreateOrConnectWithoutCategoryInput[]
    upsert?: ExpenseSubcategoryUpsertWithWhereUniqueWithoutCategoryInput | ExpenseSubcategoryUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ExpenseSubcategoryCreateManyCategoryInputEnvelope
    set?: ExpenseSubcategoryWhereUniqueInput | ExpenseSubcategoryWhereUniqueInput[]
    disconnect?: ExpenseSubcategoryWhereUniqueInput | ExpenseSubcategoryWhereUniqueInput[]
    delete?: ExpenseSubcategoryWhereUniqueInput | ExpenseSubcategoryWhereUniqueInput[]
    connect?: ExpenseSubcategoryWhereUniqueInput | ExpenseSubcategoryWhereUniqueInput[]
    update?: ExpenseSubcategoryUpdateWithWhereUniqueWithoutCategoryInput | ExpenseSubcategoryUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ExpenseSubcategoryUpdateManyWithWhereWithoutCategoryInput | ExpenseSubcategoryUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ExpenseSubcategoryScalarWhereInput | ExpenseSubcategoryScalarWhereInput[]
  }

  export type ExpenseEntryUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ExpenseEntryCreateWithoutCategoryInput, ExpenseEntryUncheckedCreateWithoutCategoryInput> | ExpenseEntryCreateWithoutCategoryInput[] | ExpenseEntryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ExpenseEntryCreateOrConnectWithoutCategoryInput | ExpenseEntryCreateOrConnectWithoutCategoryInput[]
    upsert?: ExpenseEntryUpsertWithWhereUniqueWithoutCategoryInput | ExpenseEntryUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ExpenseEntryCreateManyCategoryInputEnvelope
    set?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    disconnect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    delete?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    connect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    update?: ExpenseEntryUpdateWithWhereUniqueWithoutCategoryInput | ExpenseEntryUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ExpenseEntryUpdateManyWithWhereWithoutCategoryInput | ExpenseEntryUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ExpenseEntryScalarWhereInput | ExpenseEntryScalarWhereInput[]
  }

  export type ExpenseSubcategoryUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ExpenseSubcategoryCreateWithoutCategoryInput, ExpenseSubcategoryUncheckedCreateWithoutCategoryInput> | ExpenseSubcategoryCreateWithoutCategoryInput[] | ExpenseSubcategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ExpenseSubcategoryCreateOrConnectWithoutCategoryInput | ExpenseSubcategoryCreateOrConnectWithoutCategoryInput[]
    upsert?: ExpenseSubcategoryUpsertWithWhereUniqueWithoutCategoryInput | ExpenseSubcategoryUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ExpenseSubcategoryCreateManyCategoryInputEnvelope
    set?: ExpenseSubcategoryWhereUniqueInput | ExpenseSubcategoryWhereUniqueInput[]
    disconnect?: ExpenseSubcategoryWhereUniqueInput | ExpenseSubcategoryWhereUniqueInput[]
    delete?: ExpenseSubcategoryWhereUniqueInput | ExpenseSubcategoryWhereUniqueInput[]
    connect?: ExpenseSubcategoryWhereUniqueInput | ExpenseSubcategoryWhereUniqueInput[]
    update?: ExpenseSubcategoryUpdateWithWhereUniqueWithoutCategoryInput | ExpenseSubcategoryUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ExpenseSubcategoryUpdateManyWithWhereWithoutCategoryInput | ExpenseSubcategoryUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ExpenseSubcategoryScalarWhereInput | ExpenseSubcategoryScalarWhereInput[]
  }

  export type ExpenseEntryUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ExpenseEntryCreateWithoutCategoryInput, ExpenseEntryUncheckedCreateWithoutCategoryInput> | ExpenseEntryCreateWithoutCategoryInput[] | ExpenseEntryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ExpenseEntryCreateOrConnectWithoutCategoryInput | ExpenseEntryCreateOrConnectWithoutCategoryInput[]
    upsert?: ExpenseEntryUpsertWithWhereUniqueWithoutCategoryInput | ExpenseEntryUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ExpenseEntryCreateManyCategoryInputEnvelope
    set?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    disconnect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    delete?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    connect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    update?: ExpenseEntryUpdateWithWhereUniqueWithoutCategoryInput | ExpenseEntryUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ExpenseEntryUpdateManyWithWhereWithoutCategoryInput | ExpenseEntryUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ExpenseEntryScalarWhereInput | ExpenseEntryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSubcategoriesInput = {
    create?: XOR<UserCreateWithoutSubcategoriesInput, UserUncheckedCreateWithoutSubcategoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubcategoriesInput
    connect?: UserWhereUniqueInput
  }

  export type ExpenseCategoryCreateNestedOneWithoutSubcategoriesInput = {
    create?: XOR<ExpenseCategoryCreateWithoutSubcategoriesInput, ExpenseCategoryUncheckedCreateWithoutSubcategoriesInput>
    connectOrCreate?: ExpenseCategoryCreateOrConnectWithoutSubcategoriesInput
    connect?: ExpenseCategoryWhereUniqueInput
  }

  export type ExpenseEntryCreateNestedManyWithoutSubcategoryInput = {
    create?: XOR<ExpenseEntryCreateWithoutSubcategoryInput, ExpenseEntryUncheckedCreateWithoutSubcategoryInput> | ExpenseEntryCreateWithoutSubcategoryInput[] | ExpenseEntryUncheckedCreateWithoutSubcategoryInput[]
    connectOrCreate?: ExpenseEntryCreateOrConnectWithoutSubcategoryInput | ExpenseEntryCreateOrConnectWithoutSubcategoryInput[]
    createMany?: ExpenseEntryCreateManySubcategoryInputEnvelope
    connect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
  }

  export type ExpenseEntryUncheckedCreateNestedManyWithoutSubcategoryInput = {
    create?: XOR<ExpenseEntryCreateWithoutSubcategoryInput, ExpenseEntryUncheckedCreateWithoutSubcategoryInput> | ExpenseEntryCreateWithoutSubcategoryInput[] | ExpenseEntryUncheckedCreateWithoutSubcategoryInput[]
    connectOrCreate?: ExpenseEntryCreateOrConnectWithoutSubcategoryInput | ExpenseEntryCreateOrConnectWithoutSubcategoryInput[]
    createMany?: ExpenseEntryCreateManySubcategoryInputEnvelope
    connect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
  }

  export type UserUpdateOneWithoutSubcategoriesNestedInput = {
    create?: XOR<UserCreateWithoutSubcategoriesInput, UserUncheckedCreateWithoutSubcategoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubcategoriesInput
    upsert?: UserUpsertWithoutSubcategoriesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubcategoriesInput, UserUpdateWithoutSubcategoriesInput>, UserUncheckedUpdateWithoutSubcategoriesInput>
  }

  export type ExpenseCategoryUpdateOneRequiredWithoutSubcategoriesNestedInput = {
    create?: XOR<ExpenseCategoryCreateWithoutSubcategoriesInput, ExpenseCategoryUncheckedCreateWithoutSubcategoriesInput>
    connectOrCreate?: ExpenseCategoryCreateOrConnectWithoutSubcategoriesInput
    upsert?: ExpenseCategoryUpsertWithoutSubcategoriesInput
    connect?: ExpenseCategoryWhereUniqueInput
    update?: XOR<XOR<ExpenseCategoryUpdateToOneWithWhereWithoutSubcategoriesInput, ExpenseCategoryUpdateWithoutSubcategoriesInput>, ExpenseCategoryUncheckedUpdateWithoutSubcategoriesInput>
  }

  export type ExpenseEntryUpdateManyWithoutSubcategoryNestedInput = {
    create?: XOR<ExpenseEntryCreateWithoutSubcategoryInput, ExpenseEntryUncheckedCreateWithoutSubcategoryInput> | ExpenseEntryCreateWithoutSubcategoryInput[] | ExpenseEntryUncheckedCreateWithoutSubcategoryInput[]
    connectOrCreate?: ExpenseEntryCreateOrConnectWithoutSubcategoryInput | ExpenseEntryCreateOrConnectWithoutSubcategoryInput[]
    upsert?: ExpenseEntryUpsertWithWhereUniqueWithoutSubcategoryInput | ExpenseEntryUpsertWithWhereUniqueWithoutSubcategoryInput[]
    createMany?: ExpenseEntryCreateManySubcategoryInputEnvelope
    set?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    disconnect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    delete?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    connect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    update?: ExpenseEntryUpdateWithWhereUniqueWithoutSubcategoryInput | ExpenseEntryUpdateWithWhereUniqueWithoutSubcategoryInput[]
    updateMany?: ExpenseEntryUpdateManyWithWhereWithoutSubcategoryInput | ExpenseEntryUpdateManyWithWhereWithoutSubcategoryInput[]
    deleteMany?: ExpenseEntryScalarWhereInput | ExpenseEntryScalarWhereInput[]
  }

  export type ExpenseEntryUncheckedUpdateManyWithoutSubcategoryNestedInput = {
    create?: XOR<ExpenseEntryCreateWithoutSubcategoryInput, ExpenseEntryUncheckedCreateWithoutSubcategoryInput> | ExpenseEntryCreateWithoutSubcategoryInput[] | ExpenseEntryUncheckedCreateWithoutSubcategoryInput[]
    connectOrCreate?: ExpenseEntryCreateOrConnectWithoutSubcategoryInput | ExpenseEntryCreateOrConnectWithoutSubcategoryInput[]
    upsert?: ExpenseEntryUpsertWithWhereUniqueWithoutSubcategoryInput | ExpenseEntryUpsertWithWhereUniqueWithoutSubcategoryInput[]
    createMany?: ExpenseEntryCreateManySubcategoryInputEnvelope
    set?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    disconnect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    delete?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    connect?: ExpenseEntryWhereUniqueInput | ExpenseEntryWhereUniqueInput[]
    update?: ExpenseEntryUpdateWithWhereUniqueWithoutSubcategoryInput | ExpenseEntryUpdateWithWhereUniqueWithoutSubcategoryInput[]
    updateMany?: ExpenseEntryUpdateManyWithWhereWithoutSubcategoryInput | ExpenseEntryUpdateManyWithWhereWithoutSubcategoryInput[]
    deleteMany?: ExpenseEntryScalarWhereInput | ExpenseEntryScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutExpense_entriesInput = {
    create?: XOR<UserCreateWithoutExpense_entriesInput, UserUncheckedCreateWithoutExpense_entriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutExpense_entriesInput
    connect?: UserWhereUniqueInput
  }

  export type ExpenseAccountCreateNestedOneWithoutEntries_fromInput = {
    create?: XOR<ExpenseAccountCreateWithoutEntries_fromInput, ExpenseAccountUncheckedCreateWithoutEntries_fromInput>
    connectOrCreate?: ExpenseAccountCreateOrConnectWithoutEntries_fromInput
    connect?: ExpenseAccountWhereUniqueInput
  }

  export type ExpenseAccountCreateNestedOneWithoutEntries_toInput = {
    create?: XOR<ExpenseAccountCreateWithoutEntries_toInput, ExpenseAccountUncheckedCreateWithoutEntries_toInput>
    connectOrCreate?: ExpenseAccountCreateOrConnectWithoutEntries_toInput
    connect?: ExpenseAccountWhereUniqueInput
  }

  export type ExpenseCategoryCreateNestedOneWithoutEntriesInput = {
    create?: XOR<ExpenseCategoryCreateWithoutEntriesInput, ExpenseCategoryUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: ExpenseCategoryCreateOrConnectWithoutEntriesInput
    connect?: ExpenseCategoryWhereUniqueInput
  }

  export type ExpenseSubcategoryCreateNestedOneWithoutEntriesInput = {
    create?: XOR<ExpenseSubcategoryCreateWithoutEntriesInput, ExpenseSubcategoryUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: ExpenseSubcategoryCreateOrConnectWithoutEntriesInput
    connect?: ExpenseSubcategoryWhereUniqueInput
  }

  export type EnumExpenseEntryTypeFieldUpdateOperationsInput = {
    set?: $Enums.ExpenseEntryType
  }

  export type UserUpdateOneRequiredWithoutExpense_entriesNestedInput = {
    create?: XOR<UserCreateWithoutExpense_entriesInput, UserUncheckedCreateWithoutExpense_entriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutExpense_entriesInput
    upsert?: UserUpsertWithoutExpense_entriesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutExpense_entriesInput, UserUpdateWithoutExpense_entriesInput>, UserUncheckedUpdateWithoutExpense_entriesInput>
  }

  export type ExpenseAccountUpdateOneRequiredWithoutEntries_fromNestedInput = {
    create?: XOR<ExpenseAccountCreateWithoutEntries_fromInput, ExpenseAccountUncheckedCreateWithoutEntries_fromInput>
    connectOrCreate?: ExpenseAccountCreateOrConnectWithoutEntries_fromInput
    upsert?: ExpenseAccountUpsertWithoutEntries_fromInput
    connect?: ExpenseAccountWhereUniqueInput
    update?: XOR<XOR<ExpenseAccountUpdateToOneWithWhereWithoutEntries_fromInput, ExpenseAccountUpdateWithoutEntries_fromInput>, ExpenseAccountUncheckedUpdateWithoutEntries_fromInput>
  }

  export type ExpenseAccountUpdateOneWithoutEntries_toNestedInput = {
    create?: XOR<ExpenseAccountCreateWithoutEntries_toInput, ExpenseAccountUncheckedCreateWithoutEntries_toInput>
    connectOrCreate?: ExpenseAccountCreateOrConnectWithoutEntries_toInput
    upsert?: ExpenseAccountUpsertWithoutEntries_toInput
    disconnect?: ExpenseAccountWhereInput | boolean
    delete?: ExpenseAccountWhereInput | boolean
    connect?: ExpenseAccountWhereUniqueInput
    update?: XOR<XOR<ExpenseAccountUpdateToOneWithWhereWithoutEntries_toInput, ExpenseAccountUpdateWithoutEntries_toInput>, ExpenseAccountUncheckedUpdateWithoutEntries_toInput>
  }

  export type ExpenseCategoryUpdateOneRequiredWithoutEntriesNestedInput = {
    create?: XOR<ExpenseCategoryCreateWithoutEntriesInput, ExpenseCategoryUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: ExpenseCategoryCreateOrConnectWithoutEntriesInput
    upsert?: ExpenseCategoryUpsertWithoutEntriesInput
    connect?: ExpenseCategoryWhereUniqueInput
    update?: XOR<XOR<ExpenseCategoryUpdateToOneWithWhereWithoutEntriesInput, ExpenseCategoryUpdateWithoutEntriesInput>, ExpenseCategoryUncheckedUpdateWithoutEntriesInput>
  }

  export type ExpenseSubcategoryUpdateOneRequiredWithoutEntriesNestedInput = {
    create?: XOR<ExpenseSubcategoryCreateWithoutEntriesInput, ExpenseSubcategoryUncheckedCreateWithoutEntriesInput>
    connectOrCreate?: ExpenseSubcategoryCreateOrConnectWithoutEntriesInput
    upsert?: ExpenseSubcategoryUpsertWithoutEntriesInput
    connect?: ExpenseSubcategoryWhereUniqueInput
    update?: XOR<XOR<ExpenseSubcategoryUpdateToOneWithWhereWithoutEntriesInput, ExpenseSubcategoryUpdateWithoutEntriesInput>, ExpenseSubcategoryUncheckedUpdateWithoutEntriesInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumAuthRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthRole | EnumAuthRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AuthRole[] | ListEnumAuthRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthRole[] | ListEnumAuthRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthRoleFilter<$PrismaModel> | $Enums.AuthRole
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumAuthRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthRole | EnumAuthRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AuthRole[] | ListEnumAuthRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthRole[] | ListEnumAuthRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthRoleWithAggregatesFilter<$PrismaModel> | $Enums.AuthRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthRoleFilter<$PrismaModel>
    _max?: NestedEnumAuthRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumScheduleDayFilter<$PrismaModel = never> = {
    equals?: $Enums.ScheduleDay | EnumScheduleDayFieldRefInput<$PrismaModel>
    in?: $Enums.ScheduleDay[] | ListEnumScheduleDayFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScheduleDay[] | ListEnumScheduleDayFieldRefInput<$PrismaModel>
    not?: NestedEnumScheduleDayFilter<$PrismaModel> | $Enums.ScheduleDay
  }

  export type NestedEnumScheduleDayWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ScheduleDay | EnumScheduleDayFieldRefInput<$PrismaModel>
    in?: $Enums.ScheduleDay[] | ListEnumScheduleDayFieldRefInput<$PrismaModel>
    notIn?: $Enums.ScheduleDay[] | ListEnumScheduleDayFieldRefInput<$PrismaModel>
    not?: NestedEnumScheduleDayWithAggregatesFilter<$PrismaModel> | $Enums.ScheduleDay
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumScheduleDayFilter<$PrismaModel>
    _max?: NestedEnumScheduleDayFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumExpenseEntryTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ExpenseEntryType | EnumExpenseEntryTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExpenseEntryType[] | ListEnumExpenseEntryTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExpenseEntryType[] | ListEnumExpenseEntryTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExpenseEntryTypeFilter<$PrismaModel> | $Enums.ExpenseEntryType
  }

  export type NestedEnumExpenseEntryTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ExpenseEntryType | EnumExpenseEntryTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ExpenseEntryType[] | ListEnumExpenseEntryTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ExpenseEntryType[] | ListEnumExpenseEntryTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumExpenseEntryTypeWithAggregatesFilter<$PrismaModel> | $Enums.ExpenseEntryType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumExpenseEntryTypeFilter<$PrismaModel>
    _max?: NestedEnumExpenseEntryTypeFilter<$PrismaModel>
  }

  export type ActivityCreateWithoutUserInput = {
    uuid?: string
    name: string
    color: string
    created_at?: Date | string
    updated_at?: Date | string
    schedule_slots?: ScheduleSlotCreateNestedManyWithoutActivityInput
  }

  export type ActivityUncheckedCreateWithoutUserInput = {
    id?: number
    uuid?: string
    name: string
    color: string
    created_at?: Date | string
    updated_at?: Date | string
    schedule_slots?: ScheduleSlotUncheckedCreateNestedManyWithoutActivityInput
  }

  export type ActivityCreateOrConnectWithoutUserInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput>
  }

  export type ActivityCreateManyUserInputEnvelope = {
    data: ActivityCreateManyUserInput | ActivityCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ScheduleSlotCreateWithoutUserInput = {
    uuid?: string
    day: $Enums.ScheduleDay
    start_time: string
    end_time: string
    created_at?: Date | string
    updated_at?: Date | string
    activity: ActivityCreateNestedOneWithoutSchedule_slotsInput
  }

  export type ScheduleSlotUncheckedCreateWithoutUserInput = {
    id?: number
    uuid?: string
    activity_uuid: string
    day: $Enums.ScheduleDay
    start_time: string
    end_time: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ScheduleSlotCreateOrConnectWithoutUserInput = {
    where: ScheduleSlotWhereUniqueInput
    create: XOR<ScheduleSlotCreateWithoutUserInput, ScheduleSlotUncheckedCreateWithoutUserInput>
  }

  export type ScheduleSlotCreateManyUserInputEnvelope = {
    data: ScheduleSlotCreateManyUserInput | ScheduleSlotCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ExpenseAccountCreateWithoutUserInput = {
    uuid?: string
    name: string
    icon?: string | null
    color?: string | null
    balance?: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    entries_from?: ExpenseEntryCreateNestedManyWithoutFrom_accountInput
    entries_to?: ExpenseEntryCreateNestedManyWithoutTo_accountInput
  }

  export type ExpenseAccountUncheckedCreateWithoutUserInput = {
    id?: number
    uuid?: string
    name: string
    icon?: string | null
    color?: string | null
    balance?: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    entries_from?: ExpenseEntryUncheckedCreateNestedManyWithoutFrom_accountInput
    entries_to?: ExpenseEntryUncheckedCreateNestedManyWithoutTo_accountInput
  }

  export type ExpenseAccountCreateOrConnectWithoutUserInput = {
    where: ExpenseAccountWhereUniqueInput
    create: XOR<ExpenseAccountCreateWithoutUserInput, ExpenseAccountUncheckedCreateWithoutUserInput>
  }

  export type ExpenseAccountCreateManyUserInputEnvelope = {
    data: ExpenseAccountCreateManyUserInput | ExpenseAccountCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ExpenseEntryCreateWithoutUserInput = {
    uuid?: string
    type: $Enums.ExpenseEntryType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    entry_date?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    from_account: ExpenseAccountCreateNestedOneWithoutEntries_fromInput
    to_account?: ExpenseAccountCreateNestedOneWithoutEntries_toInput
    category: ExpenseCategoryCreateNestedOneWithoutEntriesInput
    subcategory: ExpenseSubcategoryCreateNestedOneWithoutEntriesInput
  }

  export type ExpenseEntryUncheckedCreateWithoutUserInput = {
    id?: number
    uuid?: string
    type: $Enums.ExpenseEntryType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    from_account_uuid: string
    to_account_uuid?: string | null
    category_uuid: string
    subcategory_uuid: string
    entry_date?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ExpenseEntryCreateOrConnectWithoutUserInput = {
    where: ExpenseEntryWhereUniqueInput
    create: XOR<ExpenseEntryCreateWithoutUserInput, ExpenseEntryUncheckedCreateWithoutUserInput>
  }

  export type ExpenseEntryCreateManyUserInputEnvelope = {
    data: ExpenseEntryCreateManyUserInput | ExpenseEntryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ExpenseCategoryCreateWithoutUserInput = {
    uuid?: string
    name: string
    icon?: string | null
    color?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    subcategories?: ExpenseSubcategoryCreateNestedManyWithoutCategoryInput
    entries?: ExpenseEntryCreateNestedManyWithoutCategoryInput
  }

  export type ExpenseCategoryUncheckedCreateWithoutUserInput = {
    id?: number
    uuid?: string
    name: string
    icon?: string | null
    color?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    subcategories?: ExpenseSubcategoryUncheckedCreateNestedManyWithoutCategoryInput
    entries?: ExpenseEntryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type ExpenseCategoryCreateOrConnectWithoutUserInput = {
    where: ExpenseCategoryWhereUniqueInput
    create: XOR<ExpenseCategoryCreateWithoutUserInput, ExpenseCategoryUncheckedCreateWithoutUserInput>
  }

  export type ExpenseCategoryCreateManyUserInputEnvelope = {
    data: ExpenseCategoryCreateManyUserInput | ExpenseCategoryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ExpenseSubcategoryCreateWithoutUserInput = {
    uuid?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    category: ExpenseCategoryCreateNestedOneWithoutSubcategoriesInput
    entries?: ExpenseEntryCreateNestedManyWithoutSubcategoryInput
  }

  export type ExpenseSubcategoryUncheckedCreateWithoutUserInput = {
    id?: number
    uuid?: string
    category_uuid: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    entries?: ExpenseEntryUncheckedCreateNestedManyWithoutSubcategoryInput
  }

  export type ExpenseSubcategoryCreateOrConnectWithoutUserInput = {
    where: ExpenseSubcategoryWhereUniqueInput
    create: XOR<ExpenseSubcategoryCreateWithoutUserInput, ExpenseSubcategoryUncheckedCreateWithoutUserInput>
  }

  export type ExpenseSubcategoryCreateManyUserInputEnvelope = {
    data: ExpenseSubcategoryCreateManyUserInput | ExpenseSubcategoryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ActivityUpsertWithWhereUniqueWithoutUserInput = {
    where: ActivityWhereUniqueInput
    update: XOR<ActivityUpdateWithoutUserInput, ActivityUncheckedUpdateWithoutUserInput>
    create: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput>
  }

  export type ActivityUpdateWithWhereUniqueWithoutUserInput = {
    where: ActivityWhereUniqueInput
    data: XOR<ActivityUpdateWithoutUserInput, ActivityUncheckedUpdateWithoutUserInput>
  }

  export type ActivityUpdateManyWithWhereWithoutUserInput = {
    where: ActivityScalarWhereInput
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyWithoutUserInput>
  }

  export type ActivityScalarWhereInput = {
    AND?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    OR?: ActivityScalarWhereInput[]
    NOT?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    id?: IntFilter<"Activity"> | number
    uuid?: StringFilter<"Activity"> | string
    user_uuid?: StringFilter<"Activity"> | string
    name?: StringFilter<"Activity"> | string
    color?: StringFilter<"Activity"> | string
    created_at?: DateTimeFilter<"Activity"> | Date | string
    updated_at?: DateTimeFilter<"Activity"> | Date | string
  }

  export type ScheduleSlotUpsertWithWhereUniqueWithoutUserInput = {
    where: ScheduleSlotWhereUniqueInput
    update: XOR<ScheduleSlotUpdateWithoutUserInput, ScheduleSlotUncheckedUpdateWithoutUserInput>
    create: XOR<ScheduleSlotCreateWithoutUserInput, ScheduleSlotUncheckedCreateWithoutUserInput>
  }

  export type ScheduleSlotUpdateWithWhereUniqueWithoutUserInput = {
    where: ScheduleSlotWhereUniqueInput
    data: XOR<ScheduleSlotUpdateWithoutUserInput, ScheduleSlotUncheckedUpdateWithoutUserInput>
  }

  export type ScheduleSlotUpdateManyWithWhereWithoutUserInput = {
    where: ScheduleSlotScalarWhereInput
    data: XOR<ScheduleSlotUpdateManyMutationInput, ScheduleSlotUncheckedUpdateManyWithoutUserInput>
  }

  export type ScheduleSlotScalarWhereInput = {
    AND?: ScheduleSlotScalarWhereInput | ScheduleSlotScalarWhereInput[]
    OR?: ScheduleSlotScalarWhereInput[]
    NOT?: ScheduleSlotScalarWhereInput | ScheduleSlotScalarWhereInput[]
    id?: IntFilter<"ScheduleSlot"> | number
    uuid?: StringFilter<"ScheduleSlot"> | string
    user_uuid?: StringFilter<"ScheduleSlot"> | string
    activity_uuid?: StringFilter<"ScheduleSlot"> | string
    day?: EnumScheduleDayFilter<"ScheduleSlot"> | $Enums.ScheduleDay
    start_time?: StringFilter<"ScheduleSlot"> | string
    end_time?: StringFilter<"ScheduleSlot"> | string
    created_at?: DateTimeFilter<"ScheduleSlot"> | Date | string
    updated_at?: DateTimeFilter<"ScheduleSlot"> | Date | string
  }

  export type ExpenseAccountUpsertWithWhereUniqueWithoutUserInput = {
    where: ExpenseAccountWhereUniqueInput
    update: XOR<ExpenseAccountUpdateWithoutUserInput, ExpenseAccountUncheckedUpdateWithoutUserInput>
    create: XOR<ExpenseAccountCreateWithoutUserInput, ExpenseAccountUncheckedCreateWithoutUserInput>
  }

  export type ExpenseAccountUpdateWithWhereUniqueWithoutUserInput = {
    where: ExpenseAccountWhereUniqueInput
    data: XOR<ExpenseAccountUpdateWithoutUserInput, ExpenseAccountUncheckedUpdateWithoutUserInput>
  }

  export type ExpenseAccountUpdateManyWithWhereWithoutUserInput = {
    where: ExpenseAccountScalarWhereInput
    data: XOR<ExpenseAccountUpdateManyMutationInput, ExpenseAccountUncheckedUpdateManyWithoutUserInput>
  }

  export type ExpenseAccountScalarWhereInput = {
    AND?: ExpenseAccountScalarWhereInput | ExpenseAccountScalarWhereInput[]
    OR?: ExpenseAccountScalarWhereInput[]
    NOT?: ExpenseAccountScalarWhereInput | ExpenseAccountScalarWhereInput[]
    id?: IntFilter<"ExpenseAccount"> | number
    uuid?: StringFilter<"ExpenseAccount"> | string
    user_uuid?: StringFilter<"ExpenseAccount"> | string
    name?: StringFilter<"ExpenseAccount"> | string
    icon?: StringNullableFilter<"ExpenseAccount"> | string | null
    color?: StringNullableFilter<"ExpenseAccount"> | string | null
    balance?: DecimalFilter<"ExpenseAccount"> | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFilter<"ExpenseAccount"> | Date | string
    updated_at?: DateTimeFilter<"ExpenseAccount"> | Date | string
  }

  export type ExpenseEntryUpsertWithWhereUniqueWithoutUserInput = {
    where: ExpenseEntryWhereUniqueInput
    update: XOR<ExpenseEntryUpdateWithoutUserInput, ExpenseEntryUncheckedUpdateWithoutUserInput>
    create: XOR<ExpenseEntryCreateWithoutUserInput, ExpenseEntryUncheckedCreateWithoutUserInput>
  }

  export type ExpenseEntryUpdateWithWhereUniqueWithoutUserInput = {
    where: ExpenseEntryWhereUniqueInput
    data: XOR<ExpenseEntryUpdateWithoutUserInput, ExpenseEntryUncheckedUpdateWithoutUserInput>
  }

  export type ExpenseEntryUpdateManyWithWhereWithoutUserInput = {
    where: ExpenseEntryScalarWhereInput
    data: XOR<ExpenseEntryUpdateManyMutationInput, ExpenseEntryUncheckedUpdateManyWithoutUserInput>
  }

  export type ExpenseEntryScalarWhereInput = {
    AND?: ExpenseEntryScalarWhereInput | ExpenseEntryScalarWhereInput[]
    OR?: ExpenseEntryScalarWhereInput[]
    NOT?: ExpenseEntryScalarWhereInput | ExpenseEntryScalarWhereInput[]
    id?: IntFilter<"ExpenseEntry"> | number
    uuid?: StringFilter<"ExpenseEntry"> | string
    user_uuid?: StringFilter<"ExpenseEntry"> | string
    type?: EnumExpenseEntryTypeFilter<"ExpenseEntry"> | $Enums.ExpenseEntryType
    amount?: DecimalFilter<"ExpenseEntry"> | Decimal | DecimalJsLike | number | string
    description?: StringNullableFilter<"ExpenseEntry"> | string | null
    from_account_uuid?: StringFilter<"ExpenseEntry"> | string
    to_account_uuid?: StringNullableFilter<"ExpenseEntry"> | string | null
    category_uuid?: StringFilter<"ExpenseEntry"> | string
    subcategory_uuid?: StringFilter<"ExpenseEntry"> | string
    entry_date?: DateTimeFilter<"ExpenseEntry"> | Date | string
    created_at?: DateTimeFilter<"ExpenseEntry"> | Date | string
    updated_at?: DateTimeFilter<"ExpenseEntry"> | Date | string
  }

  export type ExpenseCategoryUpsertWithWhereUniqueWithoutUserInput = {
    where: ExpenseCategoryWhereUniqueInput
    update: XOR<ExpenseCategoryUpdateWithoutUserInput, ExpenseCategoryUncheckedUpdateWithoutUserInput>
    create: XOR<ExpenseCategoryCreateWithoutUserInput, ExpenseCategoryUncheckedCreateWithoutUserInput>
  }

  export type ExpenseCategoryUpdateWithWhereUniqueWithoutUserInput = {
    where: ExpenseCategoryWhereUniqueInput
    data: XOR<ExpenseCategoryUpdateWithoutUserInput, ExpenseCategoryUncheckedUpdateWithoutUserInput>
  }

  export type ExpenseCategoryUpdateManyWithWhereWithoutUserInput = {
    where: ExpenseCategoryScalarWhereInput
    data: XOR<ExpenseCategoryUpdateManyMutationInput, ExpenseCategoryUncheckedUpdateManyWithoutUserInput>
  }

  export type ExpenseCategoryScalarWhereInput = {
    AND?: ExpenseCategoryScalarWhereInput | ExpenseCategoryScalarWhereInput[]
    OR?: ExpenseCategoryScalarWhereInput[]
    NOT?: ExpenseCategoryScalarWhereInput | ExpenseCategoryScalarWhereInput[]
    id?: IntFilter<"ExpenseCategory"> | number
    uuid?: StringFilter<"ExpenseCategory"> | string
    user_uuid?: StringNullableFilter<"ExpenseCategory"> | string | null
    name?: StringFilter<"ExpenseCategory"> | string
    icon?: StringNullableFilter<"ExpenseCategory"> | string | null
    color?: StringNullableFilter<"ExpenseCategory"> | string | null
    created_at?: DateTimeFilter<"ExpenseCategory"> | Date | string
    updated_at?: DateTimeFilter<"ExpenseCategory"> | Date | string
  }

  export type ExpenseSubcategoryUpsertWithWhereUniqueWithoutUserInput = {
    where: ExpenseSubcategoryWhereUniqueInput
    update: XOR<ExpenseSubcategoryUpdateWithoutUserInput, ExpenseSubcategoryUncheckedUpdateWithoutUserInput>
    create: XOR<ExpenseSubcategoryCreateWithoutUserInput, ExpenseSubcategoryUncheckedCreateWithoutUserInput>
  }

  export type ExpenseSubcategoryUpdateWithWhereUniqueWithoutUserInput = {
    where: ExpenseSubcategoryWhereUniqueInput
    data: XOR<ExpenseSubcategoryUpdateWithoutUserInput, ExpenseSubcategoryUncheckedUpdateWithoutUserInput>
  }

  export type ExpenseSubcategoryUpdateManyWithWhereWithoutUserInput = {
    where: ExpenseSubcategoryScalarWhereInput
    data: XOR<ExpenseSubcategoryUpdateManyMutationInput, ExpenseSubcategoryUncheckedUpdateManyWithoutUserInput>
  }

  export type ExpenseSubcategoryScalarWhereInput = {
    AND?: ExpenseSubcategoryScalarWhereInput | ExpenseSubcategoryScalarWhereInput[]
    OR?: ExpenseSubcategoryScalarWhereInput[]
    NOT?: ExpenseSubcategoryScalarWhereInput | ExpenseSubcategoryScalarWhereInput[]
    id?: IntFilter<"ExpenseSubcategory"> | number
    uuid?: StringFilter<"ExpenseSubcategory"> | string
    user_uuid?: StringNullableFilter<"ExpenseSubcategory"> | string | null
    category_uuid?: StringFilter<"ExpenseSubcategory"> | string
    name?: StringFilter<"ExpenseSubcategory"> | string
    created_at?: DateTimeFilter<"ExpenseSubcategory"> | Date | string
    updated_at?: DateTimeFilter<"ExpenseSubcategory"> | Date | string
  }

  export type UserCreateWithoutActivitiesInput = {
    uuid?: string
    email: string
    phone?: string | null
    password: string
    first_name: string
    last_name: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    schedule_slots?: ScheduleSlotCreateNestedManyWithoutUserInput
    expense_accounts?: ExpenseAccountCreateNestedManyWithoutUserInput
    expense_entries?: ExpenseEntryCreateNestedManyWithoutUserInput
    categories?: ExpenseCategoryCreateNestedManyWithoutUserInput
    subcategories?: ExpenseSubcategoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutActivitiesInput = {
    id?: number
    uuid?: string
    email: string
    phone?: string | null
    password: string
    first_name: string
    last_name: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    schedule_slots?: ScheduleSlotUncheckedCreateNestedManyWithoutUserInput
    expense_accounts?: ExpenseAccountUncheckedCreateNestedManyWithoutUserInput
    expense_entries?: ExpenseEntryUncheckedCreateNestedManyWithoutUserInput
    categories?: ExpenseCategoryUncheckedCreateNestedManyWithoutUserInput
    subcategories?: ExpenseSubcategoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutActivitiesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
  }

  export type ScheduleSlotCreateWithoutActivityInput = {
    uuid?: string
    day: $Enums.ScheduleDay
    start_time: string
    end_time: string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutSchedule_slotsInput
  }

  export type ScheduleSlotUncheckedCreateWithoutActivityInput = {
    id?: number
    uuid?: string
    user_uuid: string
    day: $Enums.ScheduleDay
    start_time: string
    end_time: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ScheduleSlotCreateOrConnectWithoutActivityInput = {
    where: ScheduleSlotWhereUniqueInput
    create: XOR<ScheduleSlotCreateWithoutActivityInput, ScheduleSlotUncheckedCreateWithoutActivityInput>
  }

  export type ScheduleSlotCreateManyActivityInputEnvelope = {
    data: ScheduleSlotCreateManyActivityInput | ScheduleSlotCreateManyActivityInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutActivitiesInput = {
    update: XOR<UserUpdateWithoutActivitiesInput, UserUncheckedUpdateWithoutActivitiesInput>
    create: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActivitiesInput, UserUncheckedUpdateWithoutActivitiesInput>
  }

  export type UserUpdateWithoutActivitiesInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    schedule_slots?: ScheduleSlotUpdateManyWithoutUserNestedInput
    expense_accounts?: ExpenseAccountUpdateManyWithoutUserNestedInput
    expense_entries?: ExpenseEntryUpdateManyWithoutUserNestedInput
    categories?: ExpenseCategoryUpdateManyWithoutUserNestedInput
    subcategories?: ExpenseSubcategoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutActivitiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    schedule_slots?: ScheduleSlotUncheckedUpdateManyWithoutUserNestedInput
    expense_accounts?: ExpenseAccountUncheckedUpdateManyWithoutUserNestedInput
    expense_entries?: ExpenseEntryUncheckedUpdateManyWithoutUserNestedInput
    categories?: ExpenseCategoryUncheckedUpdateManyWithoutUserNestedInput
    subcategories?: ExpenseSubcategoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ScheduleSlotUpsertWithWhereUniqueWithoutActivityInput = {
    where: ScheduleSlotWhereUniqueInput
    update: XOR<ScheduleSlotUpdateWithoutActivityInput, ScheduleSlotUncheckedUpdateWithoutActivityInput>
    create: XOR<ScheduleSlotCreateWithoutActivityInput, ScheduleSlotUncheckedCreateWithoutActivityInput>
  }

  export type ScheduleSlotUpdateWithWhereUniqueWithoutActivityInput = {
    where: ScheduleSlotWhereUniqueInput
    data: XOR<ScheduleSlotUpdateWithoutActivityInput, ScheduleSlotUncheckedUpdateWithoutActivityInput>
  }

  export type ScheduleSlotUpdateManyWithWhereWithoutActivityInput = {
    where: ScheduleSlotScalarWhereInput
    data: XOR<ScheduleSlotUpdateManyMutationInput, ScheduleSlotUncheckedUpdateManyWithoutActivityInput>
  }

  export type UserCreateWithoutSchedule_slotsInput = {
    uuid?: string
    email: string
    phone?: string | null
    password: string
    first_name: string
    last_name: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    activities?: ActivityCreateNestedManyWithoutUserInput
    expense_accounts?: ExpenseAccountCreateNestedManyWithoutUserInput
    expense_entries?: ExpenseEntryCreateNestedManyWithoutUserInput
    categories?: ExpenseCategoryCreateNestedManyWithoutUserInput
    subcategories?: ExpenseSubcategoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSchedule_slotsInput = {
    id?: number
    uuid?: string
    email: string
    phone?: string | null
    password: string
    first_name: string
    last_name: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    expense_accounts?: ExpenseAccountUncheckedCreateNestedManyWithoutUserInput
    expense_entries?: ExpenseEntryUncheckedCreateNestedManyWithoutUserInput
    categories?: ExpenseCategoryUncheckedCreateNestedManyWithoutUserInput
    subcategories?: ExpenseSubcategoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSchedule_slotsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSchedule_slotsInput, UserUncheckedCreateWithoutSchedule_slotsInput>
  }

  export type ActivityCreateWithoutSchedule_slotsInput = {
    uuid?: string
    name: string
    color: string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutActivitiesInput
  }

  export type ActivityUncheckedCreateWithoutSchedule_slotsInput = {
    id?: number
    uuid?: string
    user_uuid: string
    name: string
    color: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ActivityCreateOrConnectWithoutSchedule_slotsInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutSchedule_slotsInput, ActivityUncheckedCreateWithoutSchedule_slotsInput>
  }

  export type UserUpsertWithoutSchedule_slotsInput = {
    update: XOR<UserUpdateWithoutSchedule_slotsInput, UserUncheckedUpdateWithoutSchedule_slotsInput>
    create: XOR<UserCreateWithoutSchedule_slotsInput, UserUncheckedCreateWithoutSchedule_slotsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSchedule_slotsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSchedule_slotsInput, UserUncheckedUpdateWithoutSchedule_slotsInput>
  }

  export type UserUpdateWithoutSchedule_slotsInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUpdateManyWithoutUserNestedInput
    expense_accounts?: ExpenseAccountUpdateManyWithoutUserNestedInput
    expense_entries?: ExpenseEntryUpdateManyWithoutUserNestedInput
    categories?: ExpenseCategoryUpdateManyWithoutUserNestedInput
    subcategories?: ExpenseSubcategoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSchedule_slotsInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    expense_accounts?: ExpenseAccountUncheckedUpdateManyWithoutUserNestedInput
    expense_entries?: ExpenseEntryUncheckedUpdateManyWithoutUserNestedInput
    categories?: ExpenseCategoryUncheckedUpdateManyWithoutUserNestedInput
    subcategories?: ExpenseSubcategoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ActivityUpsertWithoutSchedule_slotsInput = {
    update: XOR<ActivityUpdateWithoutSchedule_slotsInput, ActivityUncheckedUpdateWithoutSchedule_slotsInput>
    create: XOR<ActivityCreateWithoutSchedule_slotsInput, ActivityUncheckedCreateWithoutSchedule_slotsInput>
    where?: ActivityWhereInput
  }

  export type ActivityUpdateToOneWithWhereWithoutSchedule_slotsInput = {
    where?: ActivityWhereInput
    data: XOR<ActivityUpdateWithoutSchedule_slotsInput, ActivityUncheckedUpdateWithoutSchedule_slotsInput>
  }

  export type ActivityUpdateWithoutSchedule_slotsInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutActivitiesNestedInput
  }

  export type ActivityUncheckedUpdateWithoutSchedule_slotsInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutExpense_accountsInput = {
    uuid?: string
    email: string
    phone?: string | null
    password: string
    first_name: string
    last_name: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    activities?: ActivityCreateNestedManyWithoutUserInput
    schedule_slots?: ScheduleSlotCreateNestedManyWithoutUserInput
    expense_entries?: ExpenseEntryCreateNestedManyWithoutUserInput
    categories?: ExpenseCategoryCreateNestedManyWithoutUserInput
    subcategories?: ExpenseSubcategoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutExpense_accountsInput = {
    id?: number
    uuid?: string
    email: string
    phone?: string | null
    password: string
    first_name: string
    last_name: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    schedule_slots?: ScheduleSlotUncheckedCreateNestedManyWithoutUserInput
    expense_entries?: ExpenseEntryUncheckedCreateNestedManyWithoutUserInput
    categories?: ExpenseCategoryUncheckedCreateNestedManyWithoutUserInput
    subcategories?: ExpenseSubcategoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutExpense_accountsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutExpense_accountsInput, UserUncheckedCreateWithoutExpense_accountsInput>
  }

  export type ExpenseEntryCreateWithoutFrom_accountInput = {
    uuid?: string
    type: $Enums.ExpenseEntryType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    entry_date?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutExpense_entriesInput
    to_account?: ExpenseAccountCreateNestedOneWithoutEntries_toInput
    category: ExpenseCategoryCreateNestedOneWithoutEntriesInput
    subcategory: ExpenseSubcategoryCreateNestedOneWithoutEntriesInput
  }

  export type ExpenseEntryUncheckedCreateWithoutFrom_accountInput = {
    id?: number
    uuid?: string
    user_uuid: string
    type: $Enums.ExpenseEntryType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    to_account_uuid?: string | null
    category_uuid: string
    subcategory_uuid: string
    entry_date?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ExpenseEntryCreateOrConnectWithoutFrom_accountInput = {
    where: ExpenseEntryWhereUniqueInput
    create: XOR<ExpenseEntryCreateWithoutFrom_accountInput, ExpenseEntryUncheckedCreateWithoutFrom_accountInput>
  }

  export type ExpenseEntryCreateManyFrom_accountInputEnvelope = {
    data: ExpenseEntryCreateManyFrom_accountInput | ExpenseEntryCreateManyFrom_accountInput[]
    skipDuplicates?: boolean
  }

  export type ExpenseEntryCreateWithoutTo_accountInput = {
    uuid?: string
    type: $Enums.ExpenseEntryType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    entry_date?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutExpense_entriesInput
    from_account: ExpenseAccountCreateNestedOneWithoutEntries_fromInput
    category: ExpenseCategoryCreateNestedOneWithoutEntriesInput
    subcategory: ExpenseSubcategoryCreateNestedOneWithoutEntriesInput
  }

  export type ExpenseEntryUncheckedCreateWithoutTo_accountInput = {
    id?: number
    uuid?: string
    user_uuid: string
    type: $Enums.ExpenseEntryType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    from_account_uuid: string
    category_uuid: string
    subcategory_uuid: string
    entry_date?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ExpenseEntryCreateOrConnectWithoutTo_accountInput = {
    where: ExpenseEntryWhereUniqueInput
    create: XOR<ExpenseEntryCreateWithoutTo_accountInput, ExpenseEntryUncheckedCreateWithoutTo_accountInput>
  }

  export type ExpenseEntryCreateManyTo_accountInputEnvelope = {
    data: ExpenseEntryCreateManyTo_accountInput | ExpenseEntryCreateManyTo_accountInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutExpense_accountsInput = {
    update: XOR<UserUpdateWithoutExpense_accountsInput, UserUncheckedUpdateWithoutExpense_accountsInput>
    create: XOR<UserCreateWithoutExpense_accountsInput, UserUncheckedCreateWithoutExpense_accountsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutExpense_accountsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutExpense_accountsInput, UserUncheckedUpdateWithoutExpense_accountsInput>
  }

  export type UserUpdateWithoutExpense_accountsInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUpdateManyWithoutUserNestedInput
    schedule_slots?: ScheduleSlotUpdateManyWithoutUserNestedInput
    expense_entries?: ExpenseEntryUpdateManyWithoutUserNestedInput
    categories?: ExpenseCategoryUpdateManyWithoutUserNestedInput
    subcategories?: ExpenseSubcategoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutExpense_accountsInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    schedule_slots?: ScheduleSlotUncheckedUpdateManyWithoutUserNestedInput
    expense_entries?: ExpenseEntryUncheckedUpdateManyWithoutUserNestedInput
    categories?: ExpenseCategoryUncheckedUpdateManyWithoutUserNestedInput
    subcategories?: ExpenseSubcategoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ExpenseEntryUpsertWithWhereUniqueWithoutFrom_accountInput = {
    where: ExpenseEntryWhereUniqueInput
    update: XOR<ExpenseEntryUpdateWithoutFrom_accountInput, ExpenseEntryUncheckedUpdateWithoutFrom_accountInput>
    create: XOR<ExpenseEntryCreateWithoutFrom_accountInput, ExpenseEntryUncheckedCreateWithoutFrom_accountInput>
  }

  export type ExpenseEntryUpdateWithWhereUniqueWithoutFrom_accountInput = {
    where: ExpenseEntryWhereUniqueInput
    data: XOR<ExpenseEntryUpdateWithoutFrom_accountInput, ExpenseEntryUncheckedUpdateWithoutFrom_accountInput>
  }

  export type ExpenseEntryUpdateManyWithWhereWithoutFrom_accountInput = {
    where: ExpenseEntryScalarWhereInput
    data: XOR<ExpenseEntryUpdateManyMutationInput, ExpenseEntryUncheckedUpdateManyWithoutFrom_accountInput>
  }

  export type ExpenseEntryUpsertWithWhereUniqueWithoutTo_accountInput = {
    where: ExpenseEntryWhereUniqueInput
    update: XOR<ExpenseEntryUpdateWithoutTo_accountInput, ExpenseEntryUncheckedUpdateWithoutTo_accountInput>
    create: XOR<ExpenseEntryCreateWithoutTo_accountInput, ExpenseEntryUncheckedCreateWithoutTo_accountInput>
  }

  export type ExpenseEntryUpdateWithWhereUniqueWithoutTo_accountInput = {
    where: ExpenseEntryWhereUniqueInput
    data: XOR<ExpenseEntryUpdateWithoutTo_accountInput, ExpenseEntryUncheckedUpdateWithoutTo_accountInput>
  }

  export type ExpenseEntryUpdateManyWithWhereWithoutTo_accountInput = {
    where: ExpenseEntryScalarWhereInput
    data: XOR<ExpenseEntryUpdateManyMutationInput, ExpenseEntryUncheckedUpdateManyWithoutTo_accountInput>
  }

  export type UserCreateWithoutCategoriesInput = {
    uuid?: string
    email: string
    phone?: string | null
    password: string
    first_name: string
    last_name: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    activities?: ActivityCreateNestedManyWithoutUserInput
    schedule_slots?: ScheduleSlotCreateNestedManyWithoutUserInput
    expense_accounts?: ExpenseAccountCreateNestedManyWithoutUserInput
    expense_entries?: ExpenseEntryCreateNestedManyWithoutUserInput
    subcategories?: ExpenseSubcategoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCategoriesInput = {
    id?: number
    uuid?: string
    email: string
    phone?: string | null
    password: string
    first_name: string
    last_name: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    schedule_slots?: ScheduleSlotUncheckedCreateNestedManyWithoutUserInput
    expense_accounts?: ExpenseAccountUncheckedCreateNestedManyWithoutUserInput
    expense_entries?: ExpenseEntryUncheckedCreateNestedManyWithoutUserInput
    subcategories?: ExpenseSubcategoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCategoriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
  }

  export type ExpenseSubcategoryCreateWithoutCategoryInput = {
    uuid?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    user?: UserCreateNestedOneWithoutSubcategoriesInput
    entries?: ExpenseEntryCreateNestedManyWithoutSubcategoryInput
  }

  export type ExpenseSubcategoryUncheckedCreateWithoutCategoryInput = {
    id?: number
    uuid?: string
    user_uuid?: string | null
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    entries?: ExpenseEntryUncheckedCreateNestedManyWithoutSubcategoryInput
  }

  export type ExpenseSubcategoryCreateOrConnectWithoutCategoryInput = {
    where: ExpenseSubcategoryWhereUniqueInput
    create: XOR<ExpenseSubcategoryCreateWithoutCategoryInput, ExpenseSubcategoryUncheckedCreateWithoutCategoryInput>
  }

  export type ExpenseSubcategoryCreateManyCategoryInputEnvelope = {
    data: ExpenseSubcategoryCreateManyCategoryInput | ExpenseSubcategoryCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ExpenseEntryCreateWithoutCategoryInput = {
    uuid?: string
    type: $Enums.ExpenseEntryType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    entry_date?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutExpense_entriesInput
    from_account: ExpenseAccountCreateNestedOneWithoutEntries_fromInput
    to_account?: ExpenseAccountCreateNestedOneWithoutEntries_toInput
    subcategory: ExpenseSubcategoryCreateNestedOneWithoutEntriesInput
  }

  export type ExpenseEntryUncheckedCreateWithoutCategoryInput = {
    id?: number
    uuid?: string
    user_uuid: string
    type: $Enums.ExpenseEntryType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    from_account_uuid: string
    to_account_uuid?: string | null
    subcategory_uuid: string
    entry_date?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ExpenseEntryCreateOrConnectWithoutCategoryInput = {
    where: ExpenseEntryWhereUniqueInput
    create: XOR<ExpenseEntryCreateWithoutCategoryInput, ExpenseEntryUncheckedCreateWithoutCategoryInput>
  }

  export type ExpenseEntryCreateManyCategoryInputEnvelope = {
    data: ExpenseEntryCreateManyCategoryInput | ExpenseEntryCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCategoriesInput = {
    update: XOR<UserUpdateWithoutCategoriesInput, UserUncheckedUpdateWithoutCategoriesInput>
    create: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCategoriesInput, UserUncheckedUpdateWithoutCategoriesInput>
  }

  export type UserUpdateWithoutCategoriesInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUpdateManyWithoutUserNestedInput
    schedule_slots?: ScheduleSlotUpdateManyWithoutUserNestedInput
    expense_accounts?: ExpenseAccountUpdateManyWithoutUserNestedInput
    expense_entries?: ExpenseEntryUpdateManyWithoutUserNestedInput
    subcategories?: ExpenseSubcategoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCategoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    schedule_slots?: ScheduleSlotUncheckedUpdateManyWithoutUserNestedInput
    expense_accounts?: ExpenseAccountUncheckedUpdateManyWithoutUserNestedInput
    expense_entries?: ExpenseEntryUncheckedUpdateManyWithoutUserNestedInput
    subcategories?: ExpenseSubcategoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ExpenseSubcategoryUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ExpenseSubcategoryWhereUniqueInput
    update: XOR<ExpenseSubcategoryUpdateWithoutCategoryInput, ExpenseSubcategoryUncheckedUpdateWithoutCategoryInput>
    create: XOR<ExpenseSubcategoryCreateWithoutCategoryInput, ExpenseSubcategoryUncheckedCreateWithoutCategoryInput>
  }

  export type ExpenseSubcategoryUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ExpenseSubcategoryWhereUniqueInput
    data: XOR<ExpenseSubcategoryUpdateWithoutCategoryInput, ExpenseSubcategoryUncheckedUpdateWithoutCategoryInput>
  }

  export type ExpenseSubcategoryUpdateManyWithWhereWithoutCategoryInput = {
    where: ExpenseSubcategoryScalarWhereInput
    data: XOR<ExpenseSubcategoryUpdateManyMutationInput, ExpenseSubcategoryUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ExpenseEntryUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ExpenseEntryWhereUniqueInput
    update: XOR<ExpenseEntryUpdateWithoutCategoryInput, ExpenseEntryUncheckedUpdateWithoutCategoryInput>
    create: XOR<ExpenseEntryCreateWithoutCategoryInput, ExpenseEntryUncheckedCreateWithoutCategoryInput>
  }

  export type ExpenseEntryUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ExpenseEntryWhereUniqueInput
    data: XOR<ExpenseEntryUpdateWithoutCategoryInput, ExpenseEntryUncheckedUpdateWithoutCategoryInput>
  }

  export type ExpenseEntryUpdateManyWithWhereWithoutCategoryInput = {
    where: ExpenseEntryScalarWhereInput
    data: XOR<ExpenseEntryUpdateManyMutationInput, ExpenseEntryUncheckedUpdateManyWithoutCategoryInput>
  }

  export type UserCreateWithoutSubcategoriesInput = {
    uuid?: string
    email: string
    phone?: string | null
    password: string
    first_name: string
    last_name: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    activities?: ActivityCreateNestedManyWithoutUserInput
    schedule_slots?: ScheduleSlotCreateNestedManyWithoutUserInput
    expense_accounts?: ExpenseAccountCreateNestedManyWithoutUserInput
    expense_entries?: ExpenseEntryCreateNestedManyWithoutUserInput
    categories?: ExpenseCategoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSubcategoriesInput = {
    id?: number
    uuid?: string
    email: string
    phone?: string | null
    password: string
    first_name: string
    last_name: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    schedule_slots?: ScheduleSlotUncheckedCreateNestedManyWithoutUserInput
    expense_accounts?: ExpenseAccountUncheckedCreateNestedManyWithoutUserInput
    expense_entries?: ExpenseEntryUncheckedCreateNestedManyWithoutUserInput
    categories?: ExpenseCategoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSubcategoriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubcategoriesInput, UserUncheckedCreateWithoutSubcategoriesInput>
  }

  export type ExpenseCategoryCreateWithoutSubcategoriesInput = {
    uuid?: string
    name: string
    icon?: string | null
    color?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    user?: UserCreateNestedOneWithoutCategoriesInput
    entries?: ExpenseEntryCreateNestedManyWithoutCategoryInput
  }

  export type ExpenseCategoryUncheckedCreateWithoutSubcategoriesInput = {
    id?: number
    uuid?: string
    user_uuid?: string | null
    name: string
    icon?: string | null
    color?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    entries?: ExpenseEntryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type ExpenseCategoryCreateOrConnectWithoutSubcategoriesInput = {
    where: ExpenseCategoryWhereUniqueInput
    create: XOR<ExpenseCategoryCreateWithoutSubcategoriesInput, ExpenseCategoryUncheckedCreateWithoutSubcategoriesInput>
  }

  export type ExpenseEntryCreateWithoutSubcategoryInput = {
    uuid?: string
    type: $Enums.ExpenseEntryType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    entry_date?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutExpense_entriesInput
    from_account: ExpenseAccountCreateNestedOneWithoutEntries_fromInput
    to_account?: ExpenseAccountCreateNestedOneWithoutEntries_toInput
    category: ExpenseCategoryCreateNestedOneWithoutEntriesInput
  }

  export type ExpenseEntryUncheckedCreateWithoutSubcategoryInput = {
    id?: number
    uuid?: string
    user_uuid: string
    type: $Enums.ExpenseEntryType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    from_account_uuid: string
    to_account_uuid?: string | null
    category_uuid: string
    entry_date?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ExpenseEntryCreateOrConnectWithoutSubcategoryInput = {
    where: ExpenseEntryWhereUniqueInput
    create: XOR<ExpenseEntryCreateWithoutSubcategoryInput, ExpenseEntryUncheckedCreateWithoutSubcategoryInput>
  }

  export type ExpenseEntryCreateManySubcategoryInputEnvelope = {
    data: ExpenseEntryCreateManySubcategoryInput | ExpenseEntryCreateManySubcategoryInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutSubcategoriesInput = {
    update: XOR<UserUpdateWithoutSubcategoriesInput, UserUncheckedUpdateWithoutSubcategoriesInput>
    create: XOR<UserCreateWithoutSubcategoriesInput, UserUncheckedCreateWithoutSubcategoriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubcategoriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubcategoriesInput, UserUncheckedUpdateWithoutSubcategoriesInput>
  }

  export type UserUpdateWithoutSubcategoriesInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUpdateManyWithoutUserNestedInput
    schedule_slots?: ScheduleSlotUpdateManyWithoutUserNestedInput
    expense_accounts?: ExpenseAccountUpdateManyWithoutUserNestedInput
    expense_entries?: ExpenseEntryUpdateManyWithoutUserNestedInput
    categories?: ExpenseCategoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSubcategoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    schedule_slots?: ScheduleSlotUncheckedUpdateManyWithoutUserNestedInput
    expense_accounts?: ExpenseAccountUncheckedUpdateManyWithoutUserNestedInput
    expense_entries?: ExpenseEntryUncheckedUpdateManyWithoutUserNestedInput
    categories?: ExpenseCategoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ExpenseCategoryUpsertWithoutSubcategoriesInput = {
    update: XOR<ExpenseCategoryUpdateWithoutSubcategoriesInput, ExpenseCategoryUncheckedUpdateWithoutSubcategoriesInput>
    create: XOR<ExpenseCategoryCreateWithoutSubcategoriesInput, ExpenseCategoryUncheckedCreateWithoutSubcategoriesInput>
    where?: ExpenseCategoryWhereInput
  }

  export type ExpenseCategoryUpdateToOneWithWhereWithoutSubcategoriesInput = {
    where?: ExpenseCategoryWhereInput
    data: XOR<ExpenseCategoryUpdateWithoutSubcategoriesInput, ExpenseCategoryUncheckedUpdateWithoutSubcategoriesInput>
  }

  export type ExpenseCategoryUpdateWithoutSubcategoriesInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutCategoriesNestedInput
    entries?: ExpenseEntryUpdateManyWithoutCategoryNestedInput
  }

  export type ExpenseCategoryUncheckedUpdateWithoutSubcategoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    entries?: ExpenseEntryUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type ExpenseEntryUpsertWithWhereUniqueWithoutSubcategoryInput = {
    where: ExpenseEntryWhereUniqueInput
    update: XOR<ExpenseEntryUpdateWithoutSubcategoryInput, ExpenseEntryUncheckedUpdateWithoutSubcategoryInput>
    create: XOR<ExpenseEntryCreateWithoutSubcategoryInput, ExpenseEntryUncheckedCreateWithoutSubcategoryInput>
  }

  export type ExpenseEntryUpdateWithWhereUniqueWithoutSubcategoryInput = {
    where: ExpenseEntryWhereUniqueInput
    data: XOR<ExpenseEntryUpdateWithoutSubcategoryInput, ExpenseEntryUncheckedUpdateWithoutSubcategoryInput>
  }

  export type ExpenseEntryUpdateManyWithWhereWithoutSubcategoryInput = {
    where: ExpenseEntryScalarWhereInput
    data: XOR<ExpenseEntryUpdateManyMutationInput, ExpenseEntryUncheckedUpdateManyWithoutSubcategoryInput>
  }

  export type UserCreateWithoutExpense_entriesInput = {
    uuid?: string
    email: string
    phone?: string | null
    password: string
    first_name: string
    last_name: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    activities?: ActivityCreateNestedManyWithoutUserInput
    schedule_slots?: ScheduleSlotCreateNestedManyWithoutUserInput
    expense_accounts?: ExpenseAccountCreateNestedManyWithoutUserInput
    categories?: ExpenseCategoryCreateNestedManyWithoutUserInput
    subcategories?: ExpenseSubcategoryCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutExpense_entriesInput = {
    id?: number
    uuid?: string
    email: string
    phone?: string | null
    password: string
    first_name: string
    last_name: string
    role: $Enums.AuthRole
    created_at?: Date | string
    updated_at?: Date | string
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
    schedule_slots?: ScheduleSlotUncheckedCreateNestedManyWithoutUserInput
    expense_accounts?: ExpenseAccountUncheckedCreateNestedManyWithoutUserInput
    categories?: ExpenseCategoryUncheckedCreateNestedManyWithoutUserInput
    subcategories?: ExpenseSubcategoryUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutExpense_entriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutExpense_entriesInput, UserUncheckedCreateWithoutExpense_entriesInput>
  }

  export type ExpenseAccountCreateWithoutEntries_fromInput = {
    uuid?: string
    name: string
    icon?: string | null
    color?: string | null
    balance?: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutExpense_accountsInput
    entries_to?: ExpenseEntryCreateNestedManyWithoutTo_accountInput
  }

  export type ExpenseAccountUncheckedCreateWithoutEntries_fromInput = {
    id?: number
    uuid?: string
    user_uuid: string
    name: string
    icon?: string | null
    color?: string | null
    balance?: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    entries_to?: ExpenseEntryUncheckedCreateNestedManyWithoutTo_accountInput
  }

  export type ExpenseAccountCreateOrConnectWithoutEntries_fromInput = {
    where: ExpenseAccountWhereUniqueInput
    create: XOR<ExpenseAccountCreateWithoutEntries_fromInput, ExpenseAccountUncheckedCreateWithoutEntries_fromInput>
  }

  export type ExpenseAccountCreateWithoutEntries_toInput = {
    uuid?: string
    name: string
    icon?: string | null
    color?: string | null
    balance?: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    user: UserCreateNestedOneWithoutExpense_accountsInput
    entries_from?: ExpenseEntryCreateNestedManyWithoutFrom_accountInput
  }

  export type ExpenseAccountUncheckedCreateWithoutEntries_toInput = {
    id?: number
    uuid?: string
    user_uuid: string
    name: string
    icon?: string | null
    color?: string | null
    balance?: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
    entries_from?: ExpenseEntryUncheckedCreateNestedManyWithoutFrom_accountInput
  }

  export type ExpenseAccountCreateOrConnectWithoutEntries_toInput = {
    where: ExpenseAccountWhereUniqueInput
    create: XOR<ExpenseAccountCreateWithoutEntries_toInput, ExpenseAccountUncheckedCreateWithoutEntries_toInput>
  }

  export type ExpenseCategoryCreateWithoutEntriesInput = {
    uuid?: string
    name: string
    icon?: string | null
    color?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    user?: UserCreateNestedOneWithoutCategoriesInput
    subcategories?: ExpenseSubcategoryCreateNestedManyWithoutCategoryInput
  }

  export type ExpenseCategoryUncheckedCreateWithoutEntriesInput = {
    id?: number
    uuid?: string
    user_uuid?: string | null
    name: string
    icon?: string | null
    color?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    subcategories?: ExpenseSubcategoryUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type ExpenseCategoryCreateOrConnectWithoutEntriesInput = {
    where: ExpenseCategoryWhereUniqueInput
    create: XOR<ExpenseCategoryCreateWithoutEntriesInput, ExpenseCategoryUncheckedCreateWithoutEntriesInput>
  }

  export type ExpenseSubcategoryCreateWithoutEntriesInput = {
    uuid?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    user?: UserCreateNestedOneWithoutSubcategoriesInput
    category: ExpenseCategoryCreateNestedOneWithoutSubcategoriesInput
  }

  export type ExpenseSubcategoryUncheckedCreateWithoutEntriesInput = {
    id?: number
    uuid?: string
    user_uuid?: string | null
    category_uuid: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ExpenseSubcategoryCreateOrConnectWithoutEntriesInput = {
    where: ExpenseSubcategoryWhereUniqueInput
    create: XOR<ExpenseSubcategoryCreateWithoutEntriesInput, ExpenseSubcategoryUncheckedCreateWithoutEntriesInput>
  }

  export type UserUpsertWithoutExpense_entriesInput = {
    update: XOR<UserUpdateWithoutExpense_entriesInput, UserUncheckedUpdateWithoutExpense_entriesInput>
    create: XOR<UserCreateWithoutExpense_entriesInput, UserUncheckedCreateWithoutExpense_entriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutExpense_entriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutExpense_entriesInput, UserUncheckedUpdateWithoutExpense_entriesInput>
  }

  export type UserUpdateWithoutExpense_entriesInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUpdateManyWithoutUserNestedInput
    schedule_slots?: ScheduleSlotUpdateManyWithoutUserNestedInput
    expense_accounts?: ExpenseAccountUpdateManyWithoutUserNestedInput
    categories?: ExpenseCategoryUpdateManyWithoutUserNestedInput
    subcategories?: ExpenseSubcategoryUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutExpense_entriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    first_name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    role?: EnumAuthRoleFieldUpdateOperationsInput | $Enums.AuthRole
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
    schedule_slots?: ScheduleSlotUncheckedUpdateManyWithoutUserNestedInput
    expense_accounts?: ExpenseAccountUncheckedUpdateManyWithoutUserNestedInput
    categories?: ExpenseCategoryUncheckedUpdateManyWithoutUserNestedInput
    subcategories?: ExpenseSubcategoryUncheckedUpdateManyWithoutUserNestedInput
  }

  export type ExpenseAccountUpsertWithoutEntries_fromInput = {
    update: XOR<ExpenseAccountUpdateWithoutEntries_fromInput, ExpenseAccountUncheckedUpdateWithoutEntries_fromInput>
    create: XOR<ExpenseAccountCreateWithoutEntries_fromInput, ExpenseAccountUncheckedCreateWithoutEntries_fromInput>
    where?: ExpenseAccountWhereInput
  }

  export type ExpenseAccountUpdateToOneWithWhereWithoutEntries_fromInput = {
    where?: ExpenseAccountWhereInput
    data: XOR<ExpenseAccountUpdateWithoutEntries_fromInput, ExpenseAccountUncheckedUpdateWithoutEntries_fromInput>
  }

  export type ExpenseAccountUpdateWithoutEntries_fromInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutExpense_accountsNestedInput
    entries_to?: ExpenseEntryUpdateManyWithoutTo_accountNestedInput
  }

  export type ExpenseAccountUncheckedUpdateWithoutEntries_fromInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    entries_to?: ExpenseEntryUncheckedUpdateManyWithoutTo_accountNestedInput
  }

  export type ExpenseAccountUpsertWithoutEntries_toInput = {
    update: XOR<ExpenseAccountUpdateWithoutEntries_toInput, ExpenseAccountUncheckedUpdateWithoutEntries_toInput>
    create: XOR<ExpenseAccountCreateWithoutEntries_toInput, ExpenseAccountUncheckedCreateWithoutEntries_toInput>
    where?: ExpenseAccountWhereInput
  }

  export type ExpenseAccountUpdateToOneWithWhereWithoutEntries_toInput = {
    where?: ExpenseAccountWhereInput
    data: XOR<ExpenseAccountUpdateWithoutEntries_toInput, ExpenseAccountUncheckedUpdateWithoutEntries_toInput>
  }

  export type ExpenseAccountUpdateWithoutEntries_toInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutExpense_accountsNestedInput
    entries_from?: ExpenseEntryUpdateManyWithoutFrom_accountNestedInput
  }

  export type ExpenseAccountUncheckedUpdateWithoutEntries_toInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    entries_from?: ExpenseEntryUncheckedUpdateManyWithoutFrom_accountNestedInput
  }

  export type ExpenseCategoryUpsertWithoutEntriesInput = {
    update: XOR<ExpenseCategoryUpdateWithoutEntriesInput, ExpenseCategoryUncheckedUpdateWithoutEntriesInput>
    create: XOR<ExpenseCategoryCreateWithoutEntriesInput, ExpenseCategoryUncheckedCreateWithoutEntriesInput>
    where?: ExpenseCategoryWhereInput
  }

  export type ExpenseCategoryUpdateToOneWithWhereWithoutEntriesInput = {
    where?: ExpenseCategoryWhereInput
    data: XOR<ExpenseCategoryUpdateWithoutEntriesInput, ExpenseCategoryUncheckedUpdateWithoutEntriesInput>
  }

  export type ExpenseCategoryUpdateWithoutEntriesInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutCategoriesNestedInput
    subcategories?: ExpenseSubcategoryUpdateManyWithoutCategoryNestedInput
  }

  export type ExpenseCategoryUncheckedUpdateWithoutEntriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    subcategories?: ExpenseSubcategoryUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type ExpenseSubcategoryUpsertWithoutEntriesInput = {
    update: XOR<ExpenseSubcategoryUpdateWithoutEntriesInput, ExpenseSubcategoryUncheckedUpdateWithoutEntriesInput>
    create: XOR<ExpenseSubcategoryCreateWithoutEntriesInput, ExpenseSubcategoryUncheckedCreateWithoutEntriesInput>
    where?: ExpenseSubcategoryWhereInput
  }

  export type ExpenseSubcategoryUpdateToOneWithWhereWithoutEntriesInput = {
    where?: ExpenseSubcategoryWhereInput
    data: XOR<ExpenseSubcategoryUpdateWithoutEntriesInput, ExpenseSubcategoryUncheckedUpdateWithoutEntriesInput>
  }

  export type ExpenseSubcategoryUpdateWithoutEntriesInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutSubcategoriesNestedInput
    category?: ExpenseCategoryUpdateOneRequiredWithoutSubcategoriesNestedInput
  }

  export type ExpenseSubcategoryUncheckedUpdateWithoutEntriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    category_uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityCreateManyUserInput = {
    id?: number
    uuid?: string
    name: string
    color: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ScheduleSlotCreateManyUserInput = {
    id?: number
    uuid?: string
    activity_uuid: string
    day: $Enums.ScheduleDay
    start_time: string
    end_time: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ExpenseAccountCreateManyUserInput = {
    id?: number
    uuid?: string
    name: string
    icon?: string | null
    color?: string | null
    balance?: Decimal | DecimalJsLike | number | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ExpenseEntryCreateManyUserInput = {
    id?: number
    uuid?: string
    type: $Enums.ExpenseEntryType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    from_account_uuid: string
    to_account_uuid?: string | null
    category_uuid: string
    subcategory_uuid: string
    entry_date?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ExpenseCategoryCreateManyUserInput = {
    id?: number
    uuid?: string
    name: string
    icon?: string | null
    color?: string | null
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ExpenseSubcategoryCreateManyUserInput = {
    id?: number
    uuid?: string
    category_uuid: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ActivityUpdateWithoutUserInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    schedule_slots?: ScheduleSlotUpdateManyWithoutActivityNestedInput
  }

  export type ActivityUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    schedule_slots?: ScheduleSlotUncheckedUpdateManyWithoutActivityNestedInput
  }

  export type ActivityUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    color?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleSlotUpdateWithoutUserInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    day?: EnumScheduleDayFieldUpdateOperationsInput | $Enums.ScheduleDay
    start_time?: StringFieldUpdateOperationsInput | string
    end_time?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    activity?: ActivityUpdateOneRequiredWithoutSchedule_slotsNestedInput
  }

  export type ScheduleSlotUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    activity_uuid?: StringFieldUpdateOperationsInput | string
    day?: EnumScheduleDayFieldUpdateOperationsInput | $Enums.ScheduleDay
    start_time?: StringFieldUpdateOperationsInput | string
    end_time?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleSlotUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    activity_uuid?: StringFieldUpdateOperationsInput | string
    day?: EnumScheduleDayFieldUpdateOperationsInput | $Enums.ScheduleDay
    start_time?: StringFieldUpdateOperationsInput | string
    end_time?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseAccountUpdateWithoutUserInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    entries_from?: ExpenseEntryUpdateManyWithoutFrom_accountNestedInput
    entries_to?: ExpenseEntryUpdateManyWithoutTo_accountNestedInput
  }

  export type ExpenseAccountUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    entries_from?: ExpenseEntryUncheckedUpdateManyWithoutFrom_accountNestedInput
    entries_to?: ExpenseEntryUncheckedUpdateManyWithoutTo_accountNestedInput
  }

  export type ExpenseAccountUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    balance?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseEntryUpdateWithoutUserInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    type?: EnumExpenseEntryTypeFieldUpdateOperationsInput | $Enums.ExpenseEntryType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    entry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    from_account?: ExpenseAccountUpdateOneRequiredWithoutEntries_fromNestedInput
    to_account?: ExpenseAccountUpdateOneWithoutEntries_toNestedInput
    category?: ExpenseCategoryUpdateOneRequiredWithoutEntriesNestedInput
    subcategory?: ExpenseSubcategoryUpdateOneRequiredWithoutEntriesNestedInput
  }

  export type ExpenseEntryUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    type?: EnumExpenseEntryTypeFieldUpdateOperationsInput | $Enums.ExpenseEntryType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    from_account_uuid?: StringFieldUpdateOperationsInput | string
    to_account_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    category_uuid?: StringFieldUpdateOperationsInput | string
    subcategory_uuid?: StringFieldUpdateOperationsInput | string
    entry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseEntryUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    type?: EnumExpenseEntryTypeFieldUpdateOperationsInput | $Enums.ExpenseEntryType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    from_account_uuid?: StringFieldUpdateOperationsInput | string
    to_account_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    category_uuid?: StringFieldUpdateOperationsInput | string
    subcategory_uuid?: StringFieldUpdateOperationsInput | string
    entry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseCategoryUpdateWithoutUserInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    subcategories?: ExpenseSubcategoryUpdateManyWithoutCategoryNestedInput
    entries?: ExpenseEntryUpdateManyWithoutCategoryNestedInput
  }

  export type ExpenseCategoryUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    subcategories?: ExpenseSubcategoryUncheckedUpdateManyWithoutCategoryNestedInput
    entries?: ExpenseEntryUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type ExpenseCategoryUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseSubcategoryUpdateWithoutUserInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: ExpenseCategoryUpdateOneRequiredWithoutSubcategoriesNestedInput
    entries?: ExpenseEntryUpdateManyWithoutSubcategoryNestedInput
  }

  export type ExpenseSubcategoryUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    category_uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    entries?: ExpenseEntryUncheckedUpdateManyWithoutSubcategoryNestedInput
  }

  export type ExpenseSubcategoryUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    category_uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleSlotCreateManyActivityInput = {
    id?: number
    uuid?: string
    user_uuid: string
    day: $Enums.ScheduleDay
    start_time: string
    end_time: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ScheduleSlotUpdateWithoutActivityInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    day?: EnumScheduleDayFieldUpdateOperationsInput | $Enums.ScheduleDay
    start_time?: StringFieldUpdateOperationsInput | string
    end_time?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSchedule_slotsNestedInput
  }

  export type ScheduleSlotUncheckedUpdateWithoutActivityInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    day?: EnumScheduleDayFieldUpdateOperationsInput | $Enums.ScheduleDay
    start_time?: StringFieldUpdateOperationsInput | string
    end_time?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ScheduleSlotUncheckedUpdateManyWithoutActivityInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    day?: EnumScheduleDayFieldUpdateOperationsInput | $Enums.ScheduleDay
    start_time?: StringFieldUpdateOperationsInput | string
    end_time?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseEntryCreateManyFrom_accountInput = {
    id?: number
    uuid?: string
    user_uuid: string
    type: $Enums.ExpenseEntryType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    to_account_uuid?: string | null
    category_uuid: string
    subcategory_uuid: string
    entry_date?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ExpenseEntryCreateManyTo_accountInput = {
    id?: number
    uuid?: string
    user_uuid: string
    type: $Enums.ExpenseEntryType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    from_account_uuid: string
    category_uuid: string
    subcategory_uuid: string
    entry_date?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ExpenseEntryUpdateWithoutFrom_accountInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    type?: EnumExpenseEntryTypeFieldUpdateOperationsInput | $Enums.ExpenseEntryType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    entry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutExpense_entriesNestedInput
    to_account?: ExpenseAccountUpdateOneWithoutEntries_toNestedInput
    category?: ExpenseCategoryUpdateOneRequiredWithoutEntriesNestedInput
    subcategory?: ExpenseSubcategoryUpdateOneRequiredWithoutEntriesNestedInput
  }

  export type ExpenseEntryUncheckedUpdateWithoutFrom_accountInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    type?: EnumExpenseEntryTypeFieldUpdateOperationsInput | $Enums.ExpenseEntryType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    to_account_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    category_uuid?: StringFieldUpdateOperationsInput | string
    subcategory_uuid?: StringFieldUpdateOperationsInput | string
    entry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseEntryUncheckedUpdateManyWithoutFrom_accountInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    type?: EnumExpenseEntryTypeFieldUpdateOperationsInput | $Enums.ExpenseEntryType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    to_account_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    category_uuid?: StringFieldUpdateOperationsInput | string
    subcategory_uuid?: StringFieldUpdateOperationsInput | string
    entry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseEntryUpdateWithoutTo_accountInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    type?: EnumExpenseEntryTypeFieldUpdateOperationsInput | $Enums.ExpenseEntryType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    entry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutExpense_entriesNestedInput
    from_account?: ExpenseAccountUpdateOneRequiredWithoutEntries_fromNestedInput
    category?: ExpenseCategoryUpdateOneRequiredWithoutEntriesNestedInput
    subcategory?: ExpenseSubcategoryUpdateOneRequiredWithoutEntriesNestedInput
  }

  export type ExpenseEntryUncheckedUpdateWithoutTo_accountInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    type?: EnumExpenseEntryTypeFieldUpdateOperationsInput | $Enums.ExpenseEntryType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    from_account_uuid?: StringFieldUpdateOperationsInput | string
    category_uuid?: StringFieldUpdateOperationsInput | string
    subcategory_uuid?: StringFieldUpdateOperationsInput | string
    entry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseEntryUncheckedUpdateManyWithoutTo_accountInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    type?: EnumExpenseEntryTypeFieldUpdateOperationsInput | $Enums.ExpenseEntryType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    from_account_uuid?: StringFieldUpdateOperationsInput | string
    category_uuid?: StringFieldUpdateOperationsInput | string
    subcategory_uuid?: StringFieldUpdateOperationsInput | string
    entry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseSubcategoryCreateManyCategoryInput = {
    id?: number
    uuid?: string
    user_uuid?: string | null
    name: string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ExpenseEntryCreateManyCategoryInput = {
    id?: number
    uuid?: string
    user_uuid: string
    type: $Enums.ExpenseEntryType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    from_account_uuid: string
    to_account_uuid?: string | null
    subcategory_uuid: string
    entry_date?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ExpenseSubcategoryUpdateWithoutCategoryInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutSubcategoriesNestedInput
    entries?: ExpenseEntryUpdateManyWithoutSubcategoryNestedInput
  }

  export type ExpenseSubcategoryUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    entries?: ExpenseEntryUncheckedUpdateManyWithoutSubcategoryNestedInput
  }

  export type ExpenseSubcategoryUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseEntryUpdateWithoutCategoryInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    type?: EnumExpenseEntryTypeFieldUpdateOperationsInput | $Enums.ExpenseEntryType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    entry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutExpense_entriesNestedInput
    from_account?: ExpenseAccountUpdateOneRequiredWithoutEntries_fromNestedInput
    to_account?: ExpenseAccountUpdateOneWithoutEntries_toNestedInput
    subcategory?: ExpenseSubcategoryUpdateOneRequiredWithoutEntriesNestedInput
  }

  export type ExpenseEntryUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    type?: EnumExpenseEntryTypeFieldUpdateOperationsInput | $Enums.ExpenseEntryType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    from_account_uuid?: StringFieldUpdateOperationsInput | string
    to_account_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory_uuid?: StringFieldUpdateOperationsInput | string
    entry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseEntryUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    type?: EnumExpenseEntryTypeFieldUpdateOperationsInput | $Enums.ExpenseEntryType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    from_account_uuid?: StringFieldUpdateOperationsInput | string
    to_account_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    subcategory_uuid?: StringFieldUpdateOperationsInput | string
    entry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseEntryCreateManySubcategoryInput = {
    id?: number
    uuid?: string
    user_uuid: string
    type: $Enums.ExpenseEntryType
    amount: Decimal | DecimalJsLike | number | string
    description?: string | null
    from_account_uuid: string
    to_account_uuid?: string | null
    category_uuid: string
    entry_date?: Date | string
    created_at?: Date | string
    updated_at?: Date | string
  }

  export type ExpenseEntryUpdateWithoutSubcategoryInput = {
    uuid?: StringFieldUpdateOperationsInput | string
    type?: EnumExpenseEntryTypeFieldUpdateOperationsInput | $Enums.ExpenseEntryType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    entry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutExpense_entriesNestedInput
    from_account?: ExpenseAccountUpdateOneRequiredWithoutEntries_fromNestedInput
    to_account?: ExpenseAccountUpdateOneWithoutEntries_toNestedInput
    category?: ExpenseCategoryUpdateOneRequiredWithoutEntriesNestedInput
  }

  export type ExpenseEntryUncheckedUpdateWithoutSubcategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    type?: EnumExpenseEntryTypeFieldUpdateOperationsInput | $Enums.ExpenseEntryType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    from_account_uuid?: StringFieldUpdateOperationsInput | string
    to_account_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    category_uuid?: StringFieldUpdateOperationsInput | string
    entry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExpenseEntryUncheckedUpdateManyWithoutSubcategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    uuid?: StringFieldUpdateOperationsInput | string
    user_uuid?: StringFieldUpdateOperationsInput | string
    type?: EnumExpenseEntryTypeFieldUpdateOperationsInput | $Enums.ExpenseEntryType
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    from_account_uuid?: StringFieldUpdateOperationsInput | string
    to_account_uuid?: NullableStringFieldUpdateOperationsInput | string | null
    category_uuid?: StringFieldUpdateOperationsInput | string
    entry_date?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}