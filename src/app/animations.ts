import {
    trigger,
    state,
    style,
    animate,
    transition,
    query,
} from '@angular/animations'

export const routeSlider = trigger('routeAnimations', [
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

export const loginSlider = trigger('insertRemoveTrigger', [
    transition(':enter', [
        style({ 
            width: 0
        }),
        animate('100ms', style({ 
            width: '100%',
        })),
    ]),
    transition(':leave', [
        animate('100ms', style({ 
            width: 0 
        }))
    ])
])