import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ApiService } from "src/app/services/api.service";
import * as ProductActions from '../actions/product.actions';
import { catchError, exhaustMap, map, of } from "rxjs";


@Injectable()
export class ProductEffects{
    constructor(private apiService: ApiService, private actions$: Actions){}

    getProduct$ = createEffect(()=>
        this.actions$.pipe(
            ofType(ProductActions.getProduct),
            exhaustMap(()=>
                this.apiService.getProducts().pipe(
                    map((products)=>{
                        return ProductActions.getProductSuccess({productList: products});
                    }),
                    catchError((error)=> of(ProductActions.getProductFailure({error})))
                )
            )
        )
    );

    deleteProduct$ = createEffect(()=>
        this.actions$.pipe(
            ofType(ProductActions.deleteProduct),
            exhaustMap((action)=>
                this.apiService.deleteProduct(action.id).pipe(
                    map(()=>{
                        return ProductActions.deleteProductSuccess();
                    }),
                    catchError((error)=> of(ProductActions.deleteProductFailure({error})))
                )
            )
        )
    );

    addProduct$ = createEffect(()=>
        this.actions$.pipe(
            ofType(ProductActions.addProduct),
            exhaustMap((action)=>
                this.apiService.addProduct(action.product).pipe(
                    map(()=>{
                        return ProductActions.addProductSuccess();
                    }),
                    catchError((error)=> of(ProductActions.addProductFailure({error})))
                )
            )
        )
    );

    updateProduct$ = createEffect(()=>
        this.actions$.pipe(
            ofType(ProductActions.updateProduct),
            exhaustMap((action)=>
                this.apiService.updateProduct(action.product).pipe(
                    map(()=>{
                        return ProductActions.updateProductSuccess();
                    }),
                    catchError((error)=> of(ProductActions.updateProductFailure({error})))
                )
            )
        )
    );
}