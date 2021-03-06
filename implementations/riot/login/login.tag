<login>
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-offset-3 col-sm-6">
				<h1>Welcome to the abstract-state-router demo!</h1>
			</div>
		</div>
		<div class="row margin-top-20">
			<div class="col-sm-offset-3 col-sm-6">
				<div class="well">
					<p class="lead">
						This is a demo webapp showing off basic usage of the <a href="https://github.com/TehShrike/abstract-state-router">abstract-state-router</a> library using a few different templating libraries.
					</p>
				</div>
			</div>
		</div>
		<div class="row margin-top-20">
			<div class="col-sm-offset-4 col-sm-4">
				<div class="form-group panel">
					<form onsubmit="{ login }" class="panel-body" action="">
						<label>
							Put in whatever username you feel like:
							<input type="text" class="form-control" name="username">
						</label>
						<button type="submit" class="btn btn-primary">"Log in"</button>
					</form>
				</div>
			</div>
		</div>
	</div>

	login() {
		opts.login(this.username.value)

		return false
	}
</login>
