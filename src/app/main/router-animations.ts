import {
    trigger,
    state,
    style,
    animate,
    transition,
    query,
} from '@angular/animations'

export const slider = trigger('routeAnimations', [
    transition('* <=> *', [
        query(':leave, :enter', [
            style({
                position: 'absolute',
                top: 0,
                left: '100%',
                width: '100%',
                height: 'max-content',
                opacity: 0,
            })
        ], { optional: true }),
        query(':enter', [
            animate('0.3s ease-out',
                style({
                    position: 'inherit',
                    opacity: 1,
                    left: 0,
                })
            )
        ], { optional: true })
    ])
]);