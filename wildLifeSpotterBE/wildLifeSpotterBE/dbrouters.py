class PostgresRouter:
    postgres_models = {
        'database.user',
    }

    def db_for_read(self, model, **hints):
        if f"{model._meta.app_label}.{model._meta.model_name}" in self.postgres_models:
            return 'default'
        return None

    def db_for_write(self, model, **hints):
        if f"{model._meta.app_label}.{model._meta.model_name}" in self.postgres_models:
            return 'default'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        if (
            f"{obj1._meta.app_label}.{obj1._meta.model_name}" in self.postgres_models or
            f"{obj2._meta.app_label}.{obj2._meta.model_name}" in self.postgres_models
        ):
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if f"{app_label}.{model_name}" in self.postgres_models:
            return db == 'default'
        return None



class MongoDBRouter:
    mongo_models = {
        'database.profiledetails',
        'database.rewards'
    }

    def db_for_read(self, model, **hints):
        if f"{model._meta.app_label}.{model._meta.model_name}" in self.mongo_models:
            return 'mongodb'
        return None

    def db_for_write(self, model, **hints):
        if f"{model._meta.app_label}.{model._meta.model_name}" in self.mongo_models:
            return 'mongodb'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        if (
            f"{obj1._meta.app_label}.{obj1._meta.model_name}" in self.mongo_models or
            f"{obj2._meta.app_label}.{obj2._meta.model_name}" in self.mongo_models
        ):
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if f"{app_label}.{model_name}" in self.mongo_models:
            return db == 'mongodb'
        return None

