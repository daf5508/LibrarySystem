import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

export const slideInAnimation = 
    trigger('routeAnimations', [
        transition('HomePage => AboutPage', slideTo('right')),
        transition('HomePage => BrowseInventoryPage', slideTo('right')),
        transition('HomePage => SearchPage', slideTo('right')),
        transition('AboutPage => HomePage', slideTo('left')),
        transition('AboutPage => BrowseInventoryPage', slideTo('right')),
        transition('AboutPage => SearchPage', slideTo('right')),
        transition('BrowseInventoryPage => HomePage', slideTo('left')),
        transition('BrowseInventoryPage => AboutPage', slideTo('left')),
        transition('BrowseInventoryPage => SearchPage', slideTo('right')),
        transition('SearchPage => HomePage', slideTo('left')),
        transition('SearchPage => AboutPage', slideTo('left')),
        transition('SearchPage => BrowseInventoryPage', slideTo('left')),
    ]);

function slideTo(direction: string) {
    const optional = { optional: true };
    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                [direction]: 0,
                width: '100%'
            })
        ], optional),
        query(':enter', [
            style({ [direction]: '-100%' })
        ]),
        group([
            query(':leave', [
                animate('600ms ease', style ({ [direction]: '100%'}))
            ], optional),
            query(':enter', [
                animate('600ms ease', style ({ [direction]: '0%'}))
            ])
        ]),
    ];
}