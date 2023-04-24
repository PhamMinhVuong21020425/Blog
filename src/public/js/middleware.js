function callback(err, user) {
    if (err) {
        console.log('Authentication error:', err);
        return;
    }

    if (!user) {
        console.log('User not found.');
        return;
    }

    console.log('Authenticated user:', user);
}