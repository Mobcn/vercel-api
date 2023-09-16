import VHandler from '#handler';

export default VHandler.config({ methods: ['GET'] }).build((query) => ({
    content: 'hello',
    ...query
}));
