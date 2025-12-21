import { Injectable, inject } from '@angular/core'
import {
    catchError,
    combineLatest,
    debounceTime,
    distinctUntilChanged,
    finalize,
    switchMap,
    tap,
    throwError,
} from 'rxjs'
import { SimpleStore } from '../store'
import { User } from './user.model'
import { UserApiService } from './user-api.service'

export type userState = {
    users: User[]
    selectedUsers: User[]
    loading: boolean
    error: boolean
    selectedId: string
    search?: string
    page?: number
    size?: number
    orderBy?: string
}

const initialUserState: userState = {
    users: [],
    selectedUsers: [],
    loading: false,
    error: false,
    selectedId: '',
    search: '',
    page: 1,
    size: 10,
    orderBy: 'title',
}

@Injectable()
export class UserListStateService extends SimpleStore<userState> {
    // private initialized = signal(false)
    userApiService = inject(UserApiService)

    constructor() {
        super(initialUserState)
    }

    init() {
        // if (this.initialized()) return
        this.continueLoadingUser()
        // this.initialized.set(true)
    }

    private continueLoadingUser() {
        combineLatest([
            this.select('search'),
            this.select('selectedId'),
            this.select('selectedId'),
            this.select('selectedId'),
        ])
            .pipe(
                debounceTime(300),
                distinctUntilChanged(),
                tap(() => this.setState({ loading: true })),
                switchMap(([search, selectedId]) => {
                    return this.userApiService.findAllUsers({
                        search,
                        selectedId,
                        page: 1,
                        size: 20,
                    })
                }),
            )
            .subscribe({
                next: (res) => {
                    console.log('LOG data', res)
                    this.setState({
                        loading: false,
                        users: res,
                    })
                },
                error: () => {
                    this.setState({ loading: false, error: true })
                },
            })
    }

    deleteUser(id: string) {
        this.setState({ loading: true })
        return this.userApiService.delete(id).pipe(
            tap(() => {
                this.removeUserFromState(id)
            }),
            catchError((error) => {
                console.error('Error deleting user:', error)
                this.setState({ error: true })
                return throwError(() => new Error('Failed to delete User'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    replaceUser(data: User) {
        console.log('LOG state User', data)
        const { users } = this.getState()
        this.setState({
            users: users.map((c) => (c.id === data.id ? data : c)),
        })
    }

    updateUser(id: any, data: Partial<User>) {
        const { users } = this.getState()
        this.setState({ loading: true })

        return this.userApiService.update(id, data).pipe(
            tap((value) => {
                if (value?.data || value.success) {
                    this.updatedUserState(id, data as User, users)
                }
            }),
            catchError((error) => {
                console.error('Error updating user:', error) // Log actual error
                this.setState({ error: true })
                return throwError(() => new Error('Failed to update'))
            }),
            finalize(() => this.setState({ loading: false })),
        )
    }

    pushUser(User: User) {
        this.setState({
            users: [User, ...this.getState().users],
        })
    }

    private removeUserFromState(id: string) {
        const updatedUsers = this.getState().users.filter(
            (User) => User.id !== id,
        )
        this.setState({ users: updatedUsers })
    }

    private updatedUserState(
        id: string,
        updatedUser: User,
        currentUsers: User[],
    ) {
        this.setState({
            users: [...currentUsers.filter((c) => c.id !== id), updatedUser],
        })
    }

    setSelectedUsers(users: User[]) {
        this.setState({ selectedUsers: [...users] })
    }
}

// import { Injectable, inject } from '@angular/core'
// import {
//     BehaviorSubject,
//     catchError,
//     Observable,
//     shareReplay,
//     switchMap,
//     tap,
//     throwError,
// } from 'rxjs'
// import { User } from './user.model'
// import { UserApiService } from './user-api.service'

// @Injectable({
//     providedIn: 'root',
// })
// export class UserStateService {
//     private userApiService = inject(UserApiService)
//     private reloadTrigger = new BehaviorSubject<void>(undefined)
//     private loadingSubject = new BehaviorSubject<boolean>(false)
//     private errorSubject = new BehaviorSubject<boolean>(false)

//     loading$ = this.loadingSubject.asObservable()
//     error$ = this.errorSubject.asObservable()

//     users$ = this.reloadTrigger.pipe(
//         tap(() => {
//             this.loadingSubject.next(true)
//             this.errorSubject.next(false)
//         }),
//         switchMap(() =>
//             this.userApiService.getUsers().pipe(
//                 tap(() => this.loadingSubject.next(false)),
//                 catchError((err) => {
//                     this.loadingSubject.next(false)
//                     this.errorSubject.next(true)
//                     return throwError(() => err)
//                 }),
//             ),
//         ),
//         shareReplay({ bufferSize: 1, refCount: true }),
//     )

//     // fun
//     private startLoading() {
//         this.loadingSubject.next(true)
//         this.errorSubject.next(false)
//     }

//     private stopLoadingWithError() {
//         this.loadingSubject.next(false)
//         this.errorSubject.next(true)
//     }

//     private stopLoading() {
//         this.loadingSubject.next(false)
//     }

//     // ---State > Data---
//     loadUsers() {
//         this.reload()
//     }

//     reload() {
//         this.reloadTrigger.next()
//     }

//     addUser(user: User): Observable<User> {
//         this.startLoading()

//         return this.userApiService.createUser(user).pipe(
//             tap(() => {
//                 this.stopLoading()
//                 this.reload()
//             }),
//             catchError((err) => {
//                 this.stopLoadingWithError()
//                 return throwError(() => err)
//             }),
//         )
//     }

//     updateUser(id: string, user: Partial<User>): Observable<User> {
//         this.startLoading()

//         return this.userApiService.updateUser({ id, ...user }).pipe(
//             tap(() => {
//                 this.stopLoading()
//                 this.reload()
//             }),
//             catchError((err) => {
//                 this.stopLoadingWithError()
//                 return throwError(() => err)
//             }),
//         )
//     }

//     deleteUser(user: User): Observable<void> {
//         this.startLoading()

//         return this.userApiService.deleteUser(user.id).pipe(
//             tap(() => {
//                 this.stopLoading()
//                 this.reload()
//             }),
//             catchError((err) => {
//                 this.stopLoadingWithError()
//                 return throwError(() => err)
//             }),
//         )
//     }
// }
